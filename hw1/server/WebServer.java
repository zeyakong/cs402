package hw1.server;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.ServerSocket;
import java.net.Socket;
import java.util.Date;

import hw1.lib.HttpHandler;
import hw1.lib.HttpRequest;
import hw1.lib.HttpResponse;

public class WebServer extends Thread {
    private int port;

    public static void main(String[] args) {
        WebServer server = new WebServer(88);
        server.start();
    }

    public WebServer(int port) {
        this.port = port;
    }

    private String defaultError(Exception exception) {
        String message = exception.getMessage();
        message = message == null ? "" : message;
        String rawResponse = "HTTP:/1.1 500 ERROR\n";
        rawResponse += "Content-type: text/plain\n";
        rawResponse += "Content-length: " + message.length() + "\n";
        rawResponse += "\n";
        rawResponse += message;
        return rawResponse;
    }

    private static void log( String msg ) {
        System.out.println( msg );
    }

    public void run() {
        ServerSocket serverSocket = null;

        try {
            serverSocket = new ServerSocket(port);
        } catch (Exception e) {
            return;
        }

        try {
            HttpHandler handler = HttpFactory.createHandler();
            log( "Listening on port: " + port );
            while (true) {
                Socket connection = null;
                try {
                    connection = serverSocket.accept();
                    try {
                        BufferedReader input = new BufferedReader(new InputStreamReader(connection.getInputStream()));
                        HttpRequest request = HttpFactory.createRequest( );

                        HttpFactory.convertRawToRequestObject(input, request);
                        System.out.println( "received request(" + new Date() + "): " + request );
                        if (request == null) {
                            throw new Exception("factory failed to make a valid web request");
                        } else {
                            HttpResponse response = HttpFactory.createResponse();
                            handler.process( request, response );
                            response.setHeader("Access-Control-Allow-Origin", "*");
                            connection.getOutputStream().write( HttpFactory.convertResponseToHttp(response).getBytes() );
                            connection.close();
                        }

                    } catch (Exception internalException) {
                        internalException.printStackTrace();
                        String raw = defaultError(internalException);
                        connection.getOutputStream().write(raw.getBytes());
                        connection.close();
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                } finally {
                    try {
                        connection.close();
                    } catch(Exception e) {}
                }
            }
        } finally {
            if (serverSocket != null)
                try {
                    serverSocket.close();
                } catch (IOException e) {
                }
        }
    }
}
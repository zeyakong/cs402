package hw1.server;

import hw1.lib.HttpHandler;
import hw1.lib.HttpRequest;
import hw1.lib.HttpResponse;

import java.io.BufferedReader;
import java.io.IOException;
import java.net.URISyntaxException;

public class HttpFactory {
    public static HttpRequest createRequest() {
        HttpRequest httpRequest = new HttpRequestImpl();
        return httpRequest;
    }

    public static HttpResponse createResponse() {
        HttpResponse httpResponse = new HttpResponseImpl();
        return httpResponse;
    }

    public static HttpHandler createHandler() {
        HttpHandler httpHandler = new HttpHandlerImpl();
        return httpHandler;
    }

    public static void convertRawToRequestObject(BufferedReader rawRequest, HttpRequest request ) throws IOException, URISyntaxException {
        // TO-DO: implement this method.  This method will be longer.  It takes a valid HTTP request "string" (contained in the rawRequest object), parses it, and puts the data into the request
    }

    public static String convertResponseToHttp( HttpResponse response ) {
        // TO-DO: implement this method.  This method takes a response object and generates a valid HTTP Response string.
        return null;
    }
}
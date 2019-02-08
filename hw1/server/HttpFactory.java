package hw1.server;

import hw1.lib.HttpHandler;
import hw1.lib.HttpRequest;
import hw1.lib.HttpResponse;

import java.io.BufferedReader;
import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;

public class HttpFactory {
    public static HttpRequest createRequest() {
        return new HttpRequestImpl();
    }

    public static HttpResponse createResponse() {
        return new HttpResponseImpl();
    }

    public static HttpHandler createHandler() {
        return new HttpHandlerImpl();
    }

    public static void convertRawToRequestObject(BufferedReader rawRequest, HttpRequest request ) throws IOException, URISyntaxException {
        // TO-DO: implement this method.  This method will be longer.  It takes a valid HTTP request "string" (contained in the rawRequest object), parses it, and puts the data into the request
//        if(!rawRequest.ready())return;
        String oneLine;
        String firstLine= rawRequest.readLine();
        String secondLine = rawRequest.readLine();
        String[]temp;
        //find method
        temp = firstLine.split(" ");
        request.setMethod(temp[0]);
        request.setVersion(temp[2]);
        firstLine = temp[1];
        temp = secondLine.split(": ");
        String version=request.getVersion();
        String scheme;
        if(version.equals("HTTP/1.1")) scheme = "http://";
        else if(version.startsWith("HTTP/2"))scheme = "https://";
        else scheme = version+"://";
        String uriText = scheme+temp[1]+firstLine;
        URI uri = URI.create(uriText);
        request.setHost(uri.getHost());
        request.setPath(uri.getPath());
        request.setPort(uri.getPort());
        request.setUrl(uri.toURL().toString());
        String queryText = uri.getQuery();
        if(queryText!=null && !queryText.equals("")){
            if(queryText.contains("&")) {
                temp = queryText.split("&");
            }
            else temp = new String[]{queryText};
            String[] querys;
            for(String s:temp){
                querys = s.split("=",2);
                request.setQuery(querys[0],querys[1]);
            }
        }
        String body="";
        //Parse header
        while(rawRequest.ready()){
            oneLine = rawRequest.readLine();
            if(oneLine.equals(""))break;
            temp = oneLine.split(": ",2);
            request.setHeader(temp[0],temp[1]);
        }
        //Parse body
        while(rawRequest.ready()) body +=(char)rawRequest.read();
        request.setBody(body);
    }

    public static String convertResponseToHttp( HttpResponse response ) {
        // TO-DO: implement this method.  This method takes a response object and generates a valid HTTP Response string.

        return response.getVersion()+" "+ response.getStatusCode()+" "+response.getDescription()+"\n\n"+response.getBody();
    }
}
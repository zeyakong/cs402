package hw1.server;

import hw1.lib.HttpHandler;
import hw1.lib.HttpRequest;
import hw1.lib.HttpResponse;

import java.io.BufferedReader;
import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.Iterator;
import java.util.Set;

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

    public static void convertRawToRequestObject(BufferedReader rawRequest, HttpRequest request) throws IOException, URISyntaxException {
        //Parse first-line information. First line includes [method] [path] [version]
        String firstLine = rawRequest.readLine();
        //Some requests are null. ignore the null request.
        if (firstLine == null || firstLine.equals("")) return;
        String[] temp;
        //find method and version
        temp = firstLine.split(" ");
        request.setMethod(temp[0]);
        request.setVersion(temp[2]);
        String path = temp[1];
        //Parse the headers. The information of host and port are in the header part.
        String oneLine;
        String uriText = "";
        while (rawRequest.ready()) {
            oneLine = rawRequest.readLine();
            //If the Parser find a empty line, which means the following is a body. So, break this function
            if (oneLine.equals("")) break;
            temp = oneLine.split(": ", 2);
            //host info is in this section
            if (temp[0].equals("Host")) {
                uriText = "http://" + temp[1] + path;
            } else {
                request.setHeader(temp[0], temp[1]);
            }
        }
        //Parse body
        String body = "";
        while (rawRequest.ready()) body += (char) rawRequest.read();
        request.setBody(body);
        //Parse the url by using Java URI api and find the queries
        URI uri = URI.create(uriText);
        request.setHost(uri.getHost());
        request.setPath(uri.getPath());
        request.setPort(uri.getPort());
        request.setUrl(uri.toURL().toString());
        String queryText = uri.getQuery();
        if (queryText != null && !queryText.equals("")) {
            if (queryText.contains("&")) {
                temp = queryText.split("&");
            } else temp = new String[]{queryText};
            String[] queries;
            for (String s : temp) {
                if (s.contains("=")) {
                    queries = s.split("=", 2);
                    request.setQuery(queries[0], queries[1]);
                } else {
                    request.setQuery(s, "");
                }
            }
        }
    }

    public static String convertResponseToHttp(HttpResponse response) {
        // TO-DO: implement this method.  This method takes a response object and generates a valid HTTP Response string.
        String result = response.getVersion() + " " + response.getStatusCode() + " " + response.getDescription() + "\n";
        Set<String> headersKey = response.getHeaderNames();
        for (Iterator<String> i = headersKey.iterator(); i.hasNext(); ) {
            String key = i.next();
            result += key + ": " + response.getHeader(key) + "\n";
        }
        result += "\n" + response.getBody();
        return result;
    }
}
package hw1.server;

import hw1.lib.HttpHandler;
import hw1.lib.HttpRequest;
import hw1.lib.HttpResponse;

public class HttpHandlerImpl implements HttpHandler {
    @Override
    public void process(HttpRequest request, HttpResponse response) {
        if(request!=null) response.setStatusCode("200");
        response.setHeader("Timestamp",new java.util.Date().toString());
    }
}

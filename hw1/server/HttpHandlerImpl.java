package hw1.server;

import hw1.lib.HttpHandler;
import hw1.lib.HttpRequest;
import hw1.lib.HttpResponse;

import java.util.Iterator;
import java.util.Set;

public class HttpHandlerImpl implements HttpHandler {
    @Override
    public void process(HttpRequest request, HttpResponse response) {
        String defaultColor = "#F0FEFF";
        response.setStatusCode("200");
        response.setHeader("Timestamp", new java.util.Date().toString());
        response.setDescription("OK");
        response.setVersion("HTTP/1.1");
        String bodyString = "<!DOCTYPE html><html><head><style>\n" +
                "table {\n" +
                "  border-collapse: collapse;\n" +
                "  width: 80%;\n" +
                " font-size:17px;\n"+
                "}\n" +
                "td, th {\n" +
                "  border: 1px solid #000000;\n" +
                "  text-align: left;\n" +
                "  padding: 8px;\n" +
                "}th {color: white}"+
                "tr:nth-child(odd) {\n" +
                "  background-color: "+defaultColor+";\n" +
                "}</style></head><body><table><tr>";
        bodyString += "<th colspan=\"2\" bgcolor=\"#000000\"><center>First Line Information</center></th></tr>\n";
        bodyString += "<tr><td>Method</td><td>" + request.getMethod() + "</td></tr>\n";
        bodyString += "<tr><td>Host</td><td>" + request.getHost() + "</td></tr>\n";
        bodyString += "<tr><td>Port</td><td>" + request.getPort() + "</td></tr>\n";
        bodyString += "<tr><td>Path</td><td>" + request.getPath() + "</td></tr>\n";
        bodyString += "<tr><td>Version</td><td>" + request.getVersion() + "</td></tr>\n";
        Set<String> requestHeaderKeys = request.getHeaderNames();
        Set<String> requestQueryKeys = request.getQueryNames();
        bodyString += "<tr><th colspan=\"2\" bgcolor=\"#000000\"><center>Query Parameters</center></th></tr>\n";
        for (Iterator<String> i = requestQueryKeys.iterator(); i.hasNext(); ) {
            String key = i.next();
            bodyString += "<tr><td>" + key + "</td><td>" + request.getQuery(key) + "</td></tr>\n";
        }
        bodyString += "<tr><th colspan=\"2\" bgcolor=\"#000000\"><center>Header</center></th></tr>";
        for (Iterator<String> i = requestHeaderKeys.iterator(); i.hasNext(); ) {
            String key = i.next();
            bodyString += "<tr><td>" + key + "</td><td>" + request.getHeader(key) + "</td></tr>\n";
        }
        bodyString += "<tr><th colspan=\"2\" bgcolor=\"#000000\"><center>Body</center></th></tr>";
        bodyString += (request.getBody() == null || request.getBody().equals("")) ? "<tr><td>body</td><td>null</td></tr>" : "<tr><<td>body</td>td>" + request.getBody() + "</td></tr>";
        bodyString += "</table></body></html>";

        response.setBody(bodyString);
    }
}

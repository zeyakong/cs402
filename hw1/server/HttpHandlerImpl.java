package hw1.server;

import hw1.lib.HttpHandler;
import hw1.lib.HttpRequest;
import hw1.lib.HttpResponse;

import java.util.*;

public class HttpHandlerImpl implements HttpHandler {
    @Override
    public void process(HttpRequest request, HttpResponse response) {
        //default color: very light blue.
        String highlightColor = "Azure";
        List<String> toPrint = Arrays.asList("first-line", "query-parameters", "headers", "body");
        String firstLineInfo, requestBody, htmlPrefix, htmlPostfix;
        StringBuilder queryParameters = new StringBuilder();
        StringBuilder headers = new StringBuilder();
        StringBuilder responseBody = new StringBuilder();

        response.setStatusCode("200");
        response.setHeader("Timestamp", new java.util.Date().toString());
        response.setDescription("OK");
        response.setVersion("HTTP/1.1");
        //Got first line info String
        firstLineInfo = "<tr><th colspan=\"2\"><center>First Line Information</center></th></tr>\n" +
                "<tr><td class=\"thead\">Method</td><td>" + request.getMethod() + "</td></tr>\n" +
                "<tr><td class=\"thead\">Host</td><td>" + request.getHost() + "</td></tr>\n" +
                "<tr><td class=\"thead\">Port</td><td>" + request.getPort() + "</td></tr>\n" +
                "<tr><td class=\"thead\">Path</td><td>" + request.getPath() + "</td></tr>\n" +
                "<tr><td class=\"thead\">Version</td><td>" + request.getVersion() + "</td></tr>\n";
        //Find all query parameters and store as a String called queryParameters
        Set<String> requestHeaderKeys = request.getHeaderNames();
        Set<String> requestQueryKeys = request.getQueryNames();
        queryParameters.append("<tr><th colspan=\"2\"><center>Query Parameters</center></th></tr>\n");
        if (requestQueryKeys.isEmpty()) {
            queryParameters.append("<tr><td colspan=\"2\" style=\"text-align:center;\">null</td></tr>\n");
        } else {
            for (Iterator<String> i = requestQueryKeys.iterator(); i.hasNext(); ) {
                String key = i.next();
                if (key.equals("highlight-color")) highlightColor = request.getQuery(key);
                queryParameters.append("<tr><td class=\"thead\">" + key + "</td><td>" + request.getQuery(key) + "</td></tr>\n");
            }
        }
        htmlPrefix = "<!DOCTYPE html>\n" +
                "<html lang=\"en\"><head>\n" +
                "<style>\ntable {margin-top:10px;margin: auto;border-collapse: collapse;width: 80%;font-size:17px;}\n" +
                ".thead { text-align:center;font-weight:bold; background-color:lightgrey }\n" +
                "td, th {border: 1px solid black;text-align: left;padding: 8px;}\n" +
                "th {color: white; text-align: center; background-color:black;}\n" +
                "tr:nth-child(odd) {background-color: " + highlightColor + ";}\n" +
                "</style>\n</head><body><table>";
        //Find all request headers and save it as a String called headers
        headers.append("<tr><th colspan=\"2\">Headers</th></tr>\n");
        if (requestHeaderKeys.isEmpty()) {
            headers.append("<tr><td colspan=\"2\" >null</td></tr>\n");
        } else {
            for (Iterator<String> i = requestHeaderKeys.iterator(); i.hasNext(); ) {
                String key = i.next();
                if (key.equals("include-only")) {
                    String includeContentsText = request.getHeader("include-only");
                    if (includeContentsText.contains(",")) {
                        toPrint = Arrays.asList(includeContentsText.split(","));
                    } else {
                        toPrint = Arrays.asList(includeContentsText);
                    }
                }
                headers.append("<tr><td class=\"thead\">" + key + "</td><td>" + request.getHeader(key) + "</td></tr>\n");
            }
        }
        //Find request body and generate html file.
        requestBody = "<tr><th colspan=\"2\">Body</th></tr>\n";
        requestBody += (request.getBody() == null || request.getBody().equals("")) ? "<tr><td class=\"thead\">body</td><td>null</td></tr>\n" : "<tr><td>body</td><td>" + request.getBody() + "</td></tr>\n";
        htmlPostfix = "</table></body></html>";
        responseBody.append(htmlPrefix);
        if (toPrint.contains("first-line")) responseBody.append(firstLineInfo);
        if (toPrint.contains("query-parameters")) responseBody.append(queryParameters);
        if (toPrint.contains("headers")) responseBody.append(headers);
        if (toPrint.contains("body")) responseBody.append(requestBody);
        responseBody.append(htmlPostfix);
        response.setBody(responseBody.toString());
    }
}

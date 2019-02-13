package hw1.server;

import hw1.lib.HttpResponse;

import java.util.HashMap;
import java.util.Set;

public class HttpResponseImpl implements HttpResponse {
    private String version;
    private String statusCode;
    private HashMap<String, String> header = new HashMap<>();
    private String description;
    private String body;

    @Override
    public String getVersion() {
        return version;
    }

    @Override
    public String getStatusCode() {
        return statusCode;
    }

    @Override
    public String getDescription() {
        return description;
    }

    @Override
    public String getHeader(String key) {
        return header.get(key);
    }

    @Override
    public Set<String> getHeaderNames() {
        return header.keySet();
    }

    @Override
    public String getBody() {
        return body;
    }

    @Override
    public void setVersion(String version) {
        this.version = version;
    }

    @Override
    public void setStatusCode(String statusCode) {
        this.statusCode = statusCode;
    }

    @Override
    public void setDescription(String description) {
        this.description = description;
    }

    @Override
    public void setBody(String body) {
        this.body = body;
    }

    @Override
    public void setHeader(String key, String value) {
        header.put(key, value);
    }
}

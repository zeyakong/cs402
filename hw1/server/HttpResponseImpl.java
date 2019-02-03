package hw1.server;

import hw1.lib.HttpResponse;

import java.util.Set;

public class HttpResponseImpl implements HttpResponse {
    @Override
    public String getVersion() {
        return null;
    }

    @Override
    public String getStatusCode() {
        return null;
    }

    @Override
    public String getDescription() {
        return null;
    }

    @Override
    public String getHeader(String key) {
        return null;
    }

    @Override
    public Set<String> getHeaderNames() {
        return null;
    }

    @Override
    public String getBody() {
        return null;
    }

    @Override
    public void setVersion(String version) {

    }

    @Override
    public void setStatusCode(String statusCode) {

    }

    @Override
    public void setDescription(String description) {

    }

    @Override
    public void setBody(String body) {

    }

    @Override
    public void setHeader(String key, String value) {

    }
}

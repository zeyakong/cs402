package hw1.server;

import hw1.lib.HttpRequest;

import java.util.HashMap;
import java.util.Set;

public class HttpRequestImpl implements HttpRequest {
    private String method;
    private String version;
    private HashMap<String, String> query = new HashMap<>();
    private String path;
    private String url;
    private String host;
    private String body;
    private Integer port;
    private HashMap<String, String> header = new HashMap<>();

    @Override
    public void setMethod(String method) {
        this.method = method;
    }

    @Override
    public void setVersion(String version) {
        this.version = version;
    }

    @Override
    public void setPath(String path) {
        this.path = path;
    }

    @Override
    public void setQuery(String key, String value) {
        query.put(key, value);
    }

    @Override
    public void setHeader(String key, String value) {
        header.put(key, value);
    }

    @Override
    public void setHost(String host) {
        this.host = host;
    }

    @Override
    public void setBody(String body) {
        this.body = body;
    }

    @Override
    public void setPort(Integer port) {
        this.port = port;
    }

    @Override
    public void setUrl(String url) {
        this.url = url;
    }

    @Override
    public String getUrl() {
        return url;
    }

    @Override
    public String getMethod() {
        return method;
    }

    @Override
    public String getVersion() {
        return version;
    }

    @Override
    public String getPath() {
        return path;
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
    public String getQuery(String key) {
        return query.get(key);
    }

    @Override
    public Set<String> getQueryNames() {
        return query.keySet();
    }

    @Override
    public String getHost() {
        return host;
    }

    @Override
    public String getBody() {
        return body;
    }

    @Override
    public Integer getPort() {
        return port;
    }
}

package hw1.lib;

import java.util.Set;

public interface HttpRequest {
    public static final String HOST_KEY = "Host";

    public void setMethod(String method);
    public void setVersion(String version);
    public void setPath(String path);
    public void setQuery(String key, String value);
    public void setHeader(String key, String value);
    public void setHost( String host );
    public void setBody( String body );
    public void setPort( Integer port );
    public void setUrl( String url );

    public String getUrl();
    public String getMethod();
    public String getVersion();
    public String getPath();
    public String getHeader(String key);
    public Set<String> getHeaderNames();
    public String getQuery(String key);
    public Set<String> getQueryNames();
    public String getHost();
    public String getBody();
    public Integer getPort();
}
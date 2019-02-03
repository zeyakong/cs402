package hw1.lib;

import java.util.Set;

public interface HttpResponse {
    public String getVersion();
    public String getStatusCode();
    public String getDescription();
    public String getHeader(String key);
    public Set<String> getHeaderNames();
    public String getBody();

    public void setVersion(String version);
    public void setStatusCode(String statusCode);
    public void setDescription(String description);
    public void setBody(String body);
    public void setHeader(String key, String value);
    public String toString();
}
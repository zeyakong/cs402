package com.zeyakong.hw5.models;

import org.springframework.data.annotation.Id;

public class Weather {
    @Id
    private String id;

    private String name;
    private String areaDescription;
    private String temperature;
    private String weather;
    private String weatherImg;
    private String lan;
    private String lon;

    public String getLan() {
        return lan;
    }

    public void setLan(String lan) {
        this.lan = lan;
    }

    public String getLon() {
        return lon;
    }

    public void setLon(String lon) {
        this.lon = lon;
    }

    public Weather() {

    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAreaDescription() {
        return areaDescription;
    }

    public void setAreaDescription(String areaDescription) {
        this.areaDescription = areaDescription;
    }

    public String getTemperature() {
        return temperature;
    }

    public void setTemperature(String temperature) {
        this.temperature = temperature;
    }

    public String getWeather() {
        return weather;
    }

    public void setWeather(String weather) {
        this.weather = weather;
    }

    public String getWeatherImg() {
        return weatherImg;
    }

    public void setWeatherImg(String weatherImg) {
        this.weatherImg = weatherImg;
    }

    public String getId() {
        return this.id;
    }

    public void setId(String id) {
        this.id = id;
    }

    private Weather(Builder b) {
        this.name = b.name;
        this.areaDescription = b.areaDescription;
        this.temperature = b.temperature;
        this.weather = b.weather;
        this.weatherImg = b.weatherImg;
        this.lon = b.lon;
        this.lan = b.lan;
    }

    public static class Builder {
        private String name;
        private String areaDescription;
        private String temperature;
        private String weather;
        private String weatherImg;
        private String lan;
        private String lon;

        public Builder name(String name) {
            this.name = name;
            return this;
        }

        public Builder weather(String weather) {
            this.weather = weather;
            return this;
        }

        public Builder weatherImg(String weatherImg) {
            this.weatherImg = weatherImg;
            return this;
        }

        public Builder areaDescription(String areaDescription) {
            this.areaDescription = areaDescription;
            return this;
        }

        public Builder temperature(String temperature) {
            this.temperature = temperature;
            return this;
        }

        public Builder lan(String lan) {
            this.lan = lan;
            return this;
        }

        public Builder lon(String lon) {
            this.lon = lon;
            return this;
        }

        public Weather build() {
            return new Weather(this);
        }


    }

    @Override
    public String toString() {
        return "Weather{" +
                "id='" + id + '\'' +
                ", name='" + name + '\'' +
                ", areaDescription='" + areaDescription + '\'' +
                ", temperature='" + temperature + '\'' +
                ", weather='" + weather + '\'' +
                ", weatherImg='" + weatherImg + '\'' +
                ", lan='" + lan + '\'' +
                ", lon='" + lon + '\'' +
                '}';
    }
}

package com.zeyakong.hw5.services;

import com.zeyakong.hw5.models.Weather;
import com.zeyakong.hw5.repositories.WeatherRepository;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Service
public class WeatherService {
    private static final String prePath = "https://forecast.weather.gov/newimages/medium/";
    @Autowired
    private WeatherRepository weatherRepository;

    public Weather getWeatherObject(String lan, String lon) {
        if (lan.equals("") || lon.equals("")) {
            return null;
        }

        try {
            RestTemplate restTemplate = new RestTemplate();
            String result = restTemplate.getForObject("https://forecast.weather.gov/MapClick.php?lat={lat}&lon={lon}&FcstType=json", String.class, lan, lon);
            JSONObject obj = new JSONObject(result);
            JSONObject currentOb = obj.getJSONObject("currentobservation");
            String name = currentOb.getString("name");
            String areaDescription = obj.getJSONObject("location").getString("areaDescription");
            String temperature = currentOb.getString("Temp");
            String weather = currentOb.getString("Weather");
            String weatherImg = currentOb.getString("Weatherimage");
            return new Weather.Builder()
                    .name(name)
                    .areaDescription(areaDescription)
                    .temperature(temperature)
                    .weather(weather)
                    .weatherImg(prePath + weatherImg)
                    .lan(lan)
                    .lon(lon)
                    .build();
        } catch (Exception e) {
            return null;
        }
    }

    public void saveWeather(Weather weather) {
        System.out.println(weather.getLan()+"...."+weather.getLon());
        Weather w = weatherRepository.findByLanAndLon(weather.getLan(), weather.getLon());
        if (w == null)
            weatherRepository.save(weather);
    }

    public List<Weather> findAll() {
        return weatherRepository.findAll();
    }

    public void updateWeather() {

    }
}
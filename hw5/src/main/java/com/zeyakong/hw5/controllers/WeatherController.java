package com.zeyakong.hw5.controllers;

import com.zeyakong.hw5.models.Weather;
import com.zeyakong.hw5.services.WeatherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@Controller
public class WeatherController {
    @Autowired
    private WeatherService weatherService;

    @RequestMapping(value = "/add", method = RequestMethod.GET)
    public String addLocationPage(
            @RequestParam(name = "lat", required = false, defaultValue = "")
                    String lat,
            @RequestParam(name = "lon", required = false, defaultValue = "")
                    String lon, Model model
    ) {
        Weather w = weatherService.getWeatherObject(lat, lon);
        if (w != null) {
            model.addAttribute("weatherObj", w);
        }
        return "add";
    }

    @RequestMapping(value = "/addLocation", method = RequestMethod.POST)
    public void addLocation(@ModelAttribute Weather weatherObj, HttpServletResponse res) {
        weatherService.saveWeather(weatherObj);
        try {
            res.sendRedirect("/home");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @RequestMapping(value = "/home", method = RequestMethod.GET)
    public String goHome(Model model) {
        // get all weather objects.
        List<Weather> weatherList = weatherService.findAll();

        if(weatherList!=null && weatherList.size()>0){
            model.addAttribute("list",weatherList);
            model.addAttribute("currentWeather",weatherList.get(0));
        }
        return "home";
    }
}

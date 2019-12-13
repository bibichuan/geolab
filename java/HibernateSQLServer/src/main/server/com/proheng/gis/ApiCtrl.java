package com.proheng.gis;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/api",produces = "application/json;charset=UTF-8")
public class ApiCtrl {
    private final Logger logger= LoggerFactory.getLogger(ApiCtrl.class);

}

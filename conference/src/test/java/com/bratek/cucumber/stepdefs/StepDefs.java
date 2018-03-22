package com.bratek.cucumber.stepdefs;

import com.bratek.ConferenceApp;

import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.ResultActions;

import org.springframework.boot.test.context.SpringBootTest;

@WebAppConfiguration
@SpringBootTest
@ContextConfiguration(classes = ConferenceApp.class)
public abstract class StepDefs {

    protected ResultActions actions;

}

package flowable.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import flowable.User;
import io.micronaut.core.annotation.Generated;
import io.micronaut.http.HttpResponse;
import io.micronaut.http.MediaType;
import io.micronaut.http.annotation.Controller;
import io.micronaut.http.annotation.Get;
import io.reactivex.Flowable;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.*;
import java.util.concurrent.TimeUnit;

import static io.micronaut.http.HttpResponse.ok;

@Controller("/api")
public class ApplicationController {

    private static final Logger LOG = LoggerFactory.getLogger(ApplicationController.class);

    private List<String> names = Arrays.asList(
            "A","B","C"
    );

    @Get(value = "/stringflow",produces = MediaType.TEXT_EVENT_STREAM)
    public Flowable<String> get() {
        LOG.error("string flow hit");
        ObjectMapper mapper = new ObjectMapper();
        return Flowable.fromIterable(names)
                .map(n->n+"-string")
                .map(User::new)
                .map(mapper::writeValueAsString)
                .delay(1000, TimeUnit.MILLISECONDS);
    }

    @Get(value = "/jsonflow")
    public Flowable<User> getJson() {
        LOG.error("json flow hit");
        ObjectMapper mapper = new ObjectMapper();
        return Flowable.fromIterable(names)
                .map(n->n+"-json")
                .map(User::new)
                .delay(1000, TimeUnit.MILLISECONDS);
    }

    @Get("/plain")
    public HttpResponse<User> plain() {
        LOG.error("plain json hit");
        return HttpResponse.ok(new User("plain"));
    }
}
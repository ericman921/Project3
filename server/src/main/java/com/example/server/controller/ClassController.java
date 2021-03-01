package com.example.server.controller;

import com.example.server.model.Classes;
import com.example.server.service.ClassService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/classes")
public class ClassController {
    @Autowired
    ClassService classService;

    @GetMapping
    public Iterable<Classes> getClasses() {
        return classService.getClasses();
    }

    @PostMapping
    public Classes createClasses(@RequestBody Classes classes) {
        return classService.createClass(classes);
    }

    @PatchMapping
    public Classes updateClass(@RequestBody Classes classes) {
        return classService.updateClass(classes);
    }

    @DeleteMapping("/{id}")
    public HttpStatus deleteClass(@PathVariable Long id) {
        return classService.deleteClass(id);
    }

}

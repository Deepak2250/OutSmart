package com.outsmart.controllers;

import com.outsmart.services.ResumeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/resume")
@PreAuthorize("hasAuthority('USER')")
public class ResumeController {

    private final ResumeService resumeService;

    @PostMapping("/analyze")
    public ResponseEntity<String> analyze(@RequestBody String resumeText) {
        resumeService.analyzeResume(resumeText); // The method has rate-limiting
        return ResponseEntity.ok("Resume analyzed successfully");
    }
}

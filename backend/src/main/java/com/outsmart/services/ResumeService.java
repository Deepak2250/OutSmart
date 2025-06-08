package com.outsmart.services;

import com.outsmart.annotations.RateLimitedFeature;
import org.springframework.stereotype.Service;

@Service
public class ResumeService {
    @RateLimitedFeature
    public String analyzeResume(String resumeUpload) {
        return resumeUpload;
    }
}

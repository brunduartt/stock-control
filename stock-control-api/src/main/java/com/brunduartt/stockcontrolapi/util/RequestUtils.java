package com.brunduartt.stockcontrolapi.util;

import org.springframework.data.domain.Page;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

public class RequestUtils {
    /**
     * Creates a basic page header
     * @param page Page
     * @param <T> Type of the elements in the page
     * @return Header containing the total amount of elements
     */
    public static <T> HttpHeaders createPageHeaders(Page<T> page) {
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add("X-Total-Count", Long.toString(page.getTotalElements()));
        return httpHeaders;
    }

    /**
     * Creates a response based on the optional content
     * @param optional Optional with the desired response
     * @param <T> Type of the response
     * @return Returns the optional content if it's not empty. If empty, throws an exception with 404 NOT FOUND.
     */
    public static <T> ResponseEntity<T> createResponseOptional(Optional<T> optional) {
        if(optional.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        } else {
            return ResponseEntity.ok().body(optional.get());
        }
    }
}

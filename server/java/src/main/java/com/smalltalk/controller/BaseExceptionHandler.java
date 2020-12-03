package com.smalltalk.controller;

import com.smalltalk.model.Result;
import io.jsonwebtoken.ExpiredJwtException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestControllerAdvice;

/**
 * 统一异常处理类
 */
@RestControllerAdvice
public class BaseExceptionHandler {



    @ExceptionHandler(value = ExpiredJwtException.class)
    public Result tokenMiss(Exception e) {
        e.printStackTrace();
        return new Result(false, 404, "token过期,请重新登录");
    }

    @ExceptionHandler(value = Exception.class)
    public Result error(Exception e) {
        e.printStackTrace();
        return new Result(false, 404, e.getMessage());
    }
}
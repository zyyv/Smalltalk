package com.smalltalk.controller;

import com.google.code.kaptcha.Constants;
import com.google.code.kaptcha.Producer;
import com.smalltalk.model.Result;
import com.smalltalk.model.User;
import com.smalltalk.service.UserService;
import com.smalltalk.utils.JwtUtil;
import io.jsonwebtoken.Claims;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.imageio.ImageIO;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.awt.image.BufferedImage;
import java.util.*;


@Controller
@RequestMapping("/api")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;
    /**
     * 用户登陆
     * @param loginMap
     * @return
     */
    @PostMapping(value="/login")
    @ResponseBody
    public Result login(@RequestBody Map<String,String> loginMap, HttpServletRequest request){
        User user =
                userService.findByUsernameAndPassword(loginMap.get("username"),loginMap.get("password"));

        String rightCode = (String) request.getSession().getAttribute("rightCode");
        String tryCode = request.getParameter("tryCode");
        if (rightCode.equals(tryCode)){
            if(user!=null){
                String token = jwtUtil.createJWT(user.getId(),
                        user.getUsername());
                Map map=new HashMap();
                map.put("token",token);
                map.put("name",user.getUsername());//昵称

                //保存token
                userService.saveToken(token,user.getId());

                return new Result(true,200,"登陆成功",map);

            }else{
                return new Result(false,400,"用户名或密码错误");
            }
        }else {
            return new Result(false,404,"验证码错误");
        }

    }


    /*@RequestMapping("/testToken")
    @ResponseBody
    public String test(String token){
        final Claims claims = jwtUtil.parseJWT(token);
        return claims.getId();
    }*/

    @Autowired
    private Producer captchaProducer;
    @GetMapping("/getKaptcha")
    public void getKaptcha(HttpServletResponse response, HttpSession session) throws Exception {
        response.setDateHeader("Expires", 0);
        // Set standard HTTP/1.1 no-cache headers.
        response.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");
        // Set IE extended HTTP/1.1 no-cache headers (use addHeader).
        response.addHeader("Cache-Control", "post-check=0, pre-check=0");
        // Set standard HTTP/1.0 no-cache header.
        response.setHeader("Pragma", "no-cache");
        // return a jpeg
        response.setContentType("image/jpeg");
        // create the text for the image
        String capText = captchaProducer.createText();
        // store the text in the session
        //request.getSession().setAttribute(Constants.KAPTCHA_SESSION_KEY, capText);
        //将验证码存到session
        session.setAttribute(Constants.KAPTCHA_SESSION_KEY, capText);
//        log.info(capText);
        // create the image with the text
        BufferedImage bi = captchaProducer.createImage(capText);
        ServletOutputStream out = response.getOutputStream();
        // write the data out
        ImageIO.write(bi, "jpg", out);
        try {
            out.flush();
        } finally {
            out.close();
        }
    }

    @GetMapping("/sendSms")
    @ResponseBody
    public String sendSms() {
        Random random = new Random();
        final String s = (String.valueOf(random.nextDouble())).substring(2,6);
        return s;
    }
}

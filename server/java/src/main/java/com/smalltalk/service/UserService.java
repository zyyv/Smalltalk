package com.smalltalk.service;

import com.baomidou.mybatisplus.core.conditions.Wrapper;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.conditions.update.UpdateWrapper;
import com.smalltalk.mapper.UserMapper;
import com.smalltalk.model.User;
import jdk.nashorn.internal.parser.Token;
import lombok.val;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserMapper userMapper;

    @Autowired
    BCryptPasswordEncoder encoder;

    /**
     * 增加
     * @param user
     * @param code
     */
    public void add(User user, String code) {

        //密码加密
        String newPassword = encoder.encode(user.getPassword());//加密后的密码
        user.setPassword(newPassword);
        userMapper.insert(user);
    }

    /**
     * 根据用户名密码查找用户
     * @param username
     * @param password
     */
    public User findByUsernameAndPassword(String username, String password) {
        QueryWrapper<User> wrapper = new QueryWrapper<>();
        wrapper.lambda()
                .eq(User::getUsername, username)
                .eq(User::getPassword, password);
        User user = userMapper.selectOne(wrapper);
        return user;
    }

    /**
     * 根据用户名密码查找用户
     * @param token
     * @param id
     */
    public void saveToken(String token, Integer id) {
        User user = new User();
        user.setToken(token);
        user.setId(id);
        userMapper.updateById(user);
    }
}

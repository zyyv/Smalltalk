package com.smalltalk.model;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

@TableName("user")
@Data
public class User implements Serializable {
    @TableId(type = IdType.INPUT)
    private Integer id;
    private String username;
    private String password;
    private String email;
    private String token;

}


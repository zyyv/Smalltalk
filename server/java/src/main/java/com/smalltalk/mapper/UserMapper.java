package com.smalltalk.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.smalltalk.model.User;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Component;


public interface UserMapper extends BaseMapper<User> {

}

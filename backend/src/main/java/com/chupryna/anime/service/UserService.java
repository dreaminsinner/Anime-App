package com.chupryna.anime.service;

import com.chupryna.anime.dto.UserDTO;
import com.chupryna.anime.entity.User;
import com.chupryna.anime.repositories.UsersRepository;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService implements UserDetailsService {

    private final UsersRepository usersRepository;

    private final ModelMapper modelMapper;



    @Autowired
    public UserService(UsersRepository usersRepository, ModelMapper modelMapper) {
        this.usersRepository = usersRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> user = usersRepository.findByUsername(username);
        if (user.isEmpty()) throw new UsernameNotFoundException("User not found");
        return org.springframework.security.core.userdetails.User
                .withUsername(user.get().getUsername())
                .password(user.get().getPassword())
                .roles(user.get().getRole())
                .build();
    }

    @Transactional
    public void saveUser(UserDTO userDTO){
        usersRepository.save(modelMapper.map(userDTO, User.class));
    }

    public Optional<User> findUserByUsername(String username){
        return usersRepository.findByUsername(username);
    }

    @Transactional
    public void deleteUser(User user){
        usersRepository.delete(user);
    }

    public List<User> findAllUsers(){
        return usersRepository.findAll();
    }

    public Optional<User> findById(String id){
        return usersRepository.findById(id);
    }
}

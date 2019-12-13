package com.proheng;

import org.apache.avro.AvroRemoteException;

public class HelloService implements HelloProtocol {
    @Override
    public CharSequence hello(User user) {
        System.out.println(user.getName() + "," + user.getFavoriteNumber() + "," + user.getFavoriteColor());
        return "hai i`m from avro service";
    }
}

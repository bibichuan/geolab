package com.proheng;

import org.apache.avro.ipc.netty.NettyTransceiver;
import org.apache.avro.ipc.specific.SpecificRequestor;

import java.net.InetSocketAddress;

/**
 * Hello world!
 *
 */
public class App 
{
    public static void main( String[] args )
    {
        System.out.println( "Hello World!" );

        try{
            NettyTransceiver client = new NettyTransceiver(new InetSocketAddress(65111));
            HelloProtocol proxy = SpecificRequestor.getClient(HelloProtocol.class, client);
            User user = new User();
            user.setName("xiaofen");
            user.setFavoriteNumber(1);
            user.setFavoriteColor("dsf");
            System.out.println(proxy.hello(user));
        }catch (Exception e){
            System.out.println(e);
        }

    }
}

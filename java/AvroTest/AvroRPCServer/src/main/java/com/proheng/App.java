package com.proheng;

import org.apache.avro.ipc.Responder;
import org.apache.avro.ipc.Server;
import org.apache.avro.ipc.netty.NettyServer;
import org.apache.avro.ipc.specific.SpecificResponder;

import java.net.InetSocketAddress;

/**
 * Hello world!
 *
 */
public class App 
{
    @SuppressWarnings("unused")
    private static Server server;
    public static void main( String[] args )
    {
        System.out.println( "Hello World!" );
        //服务端协议
        Responder responder=new SpecificResponder(HelloProtocol.class, new HelloService());
        server=new NettyServer(responder, new InetSocketAddress(65111));
    }
}

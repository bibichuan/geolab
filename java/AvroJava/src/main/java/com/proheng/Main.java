package com.proheng;

import org.apache.avro.file.DataFileReader;
import org.apache.avro.file.DataFileWriter;
import org.apache.avro.io.DatumReader;
import org.apache.avro.io.DatumWriter;
import org.apache.avro.specific.SpecificDatumReader;
import org.apache.avro.specific.SpecificDatumWriter;

import java.io.*;

/**
 * Hello world!
 *
 */
public class Main
{
    public static void main( String[] args )
    {
//        User user1 = new User();
//
//        user1.setName("Alyssa");
//        user1.setFavoriteNumber(256);
//        // Leave favorite color null
//
//        // Alternate constructor
//        User user2 = new User("Ben", 7, "red");
//
//        // Construct via builder
//        User user3 = User.newBuilder()
//                .setName("Charlie")
//                .setFavoriteColor("blue")
//                .setFavoriteNumber(null)
//                .build();
//        // Serialize user1, user2 and user3 to disk
//        DatumWriter<User> userDatumWriter = new SpecificDatumWriter<User>(User.class);
//        DataFileWriter<User> dataFileWriter = new DataFileWriter<User>(userDatumWriter);
//        try {
//            dataFileWriter.create(user1.getSchema(), new File("D:\\zlc\\AvroJava\\users.avro"));
//            dataFileWriter.append(user1);
//            dataFileWriter.append(user2);
//            dataFileWriter.append(user3);
//            dataFileWriter.close();
//        }catch (Exception e){
//            System.out.println();
//        }

        //反序列化
        // Deserialize Users from disk
        DatumReader<User> userDatumReader = new SpecificDatumReader<User>(User.class);

        // 使用这种方式可以避免因为对象太多而造成的对 gc  的不良影响。
        User user = null;
        try{
            DataFileReader<User> dataFileReader = new DataFileReader<User>( new File("D:\\zlc\\AvroJava\\users.avro"),
                    userDatumReader);
            while (dataFileReader.hasNext()) {
                // Reuse user object by passing it to next(). This saves us from
                // allocating and garbage collecting many objects for files with
                // many items.
                user = dataFileReader.next(user);
                System.out.println(user);
            }
        }catch (Exception e){
            System.out.println(e);
        }

        //读取二进制数据
        try {
            DataInputStream dis = new DataInputStream(
                    new BufferedInputStream(new FileInputStream(
                            "D:\\zlc\\AvroJava\\users.avro")));
            //System.out.println(Byte.parseByte(is.readUTF()));
            int count = dis.available();
            System.out.println(count);

            // create buffer
            byte[] bs = new byte[count];

            // read data into buffer
            dis.read(bs);

            // for each byte in the buffer
            for (byte b:bs)
            {
                // convert byte into character
                char c = (char)b;
                System.out.println(b);

                // print the character
                System.out.print(c+" ");
            }


//            System.out.println(is.readInt());
//            System.out.println(is.readByte());
//            System.out.println(is.readBoolean());
//            System.out.println(is.readFloat());
//            System.out.println(is.readLong());
//            System.out.println(is.readUTF());

            dis.close();
        } catch (IOException e) {
            System.out.println("dddd");
            System.out.println(e);
        }
    }
}

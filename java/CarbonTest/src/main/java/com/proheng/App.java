package com.proheng;

import java.io.File;
import java.io.IOException;

import org.apache.carbondata.core.constants.CarbonCommonConstants;
import org.apache.carbondata.core.util.CarbonProperties;

import org.apache.spark.sql.CarbonSession;
import org.apache.spark.sql.SparkSession;

public class App {

    public static void main(String[] args) throws IOException {
        // set timestamp and date format used in data.csv for loading
        CarbonProperties.getInstance()
                .addProperty(CarbonCommonConstants.CARBON_TIMESTAMP_FORMAT, "yyyy/MM/dd HH:mm:ss")
                .addProperty(CarbonCommonConstants.CARBON_DATE_FORMAT, "yyyy/MM/dd");

        // create CarbonSession

        SparkSession.Builder builder = SparkSession.builder()
                .master("spark://192.168.1.33:7088")
                .appName("hadhoop");
                //.config("spark.driver.host", "spark://192.168.1.33:7077");

        SparkSession carbon = new CarbonSession.CarbonBuilder(builder)
                .getOrCreateCarbonSession();

        exampleBody(carbon);
        carbon.close();
    }

    public static void exampleBody(SparkSession carbon) throws IOException {
//        carbon.sql("DROP TABLE IF EXISTS source");

//        carbon.sql(
//                "CREATE TABLE source( " + "shortField SHORT, " + "intField INT, " + "bigintField LONG, "
//                        + "doubleField DOUBLE, " + "stringField STRING, " + "timestampField TIMESTAMP, "
//                        + "decimalField DECIMAL(18,2), " + "dateField DATE, " + "charField CHAR(5), "
//                        + "floatField FLOAT " + ") " + "STORED AS carbondata");
//
//        String rootPath =
//                new File(App.class.getResource("/").getPath() + "../../../..")
//                        .getCanonicalPath();
//        String path = rootPath + "/examples/spark2/src/main/resources/data.csv";
//        carbon.sql("LOAD DATA LOCAL INPATH " + "\'" + path + "\' " + "INTO TABLE source "
//                + "OPTIONS('HEADER'='true', 'COMPLEX_DELIMITER_LEVEL_1'='#')");
//
//        carbon.sql("SELECT charField, stringField, intField " + "FROM source "
//                + "WHERE stringfield = 'spark' AND decimalField > 40").show();
//
//        carbon.sql("SELECT * " + "FROM source WHERE length(stringField) = 5").show();
//
//        carbon.sql("SELECT * " + "FROM source "
//                + "WHERE date_format(dateField, \'yyyy-MM-dd \') = \'2015-07-23\'").show();
//
//        carbon.sql("SELECT count(stringField) FROM source").show();
//
//        carbon.sql("SELECT sum(intField), stringField " + "FROM source " + "GROUP BY stringField")
//                .show();
//
//        carbon.sql("SELECT t1.*, t2.* " + "FROM source t1, source t2 "
//                + "WHERE t1.stringField = t2.stringField").show();
//
//        carbon.sql(
//                "WITH t1 AS ( " + "SELECT * FROM source " + "UNION ALL " + "SELECT * FROM source" + ") "
//                        + "SELECT t1.*, t2.* " + "FROM t1, source t2 "
//                        + "WHERE t1.stringField = t2.stringField").show();

        carbon.sql("SELECT * " + "FROM source " + "WHERE stringField = 'spark' and floatField > 2.8")
                .show();

//        carbon.sql("DROP TABLE IF EXISTS source");
    }
}
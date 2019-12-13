package com.proheng.gis.Entity;

import javax.persistence.*;
import java.math.BigDecimal;
import java.sql.Timestamp;

@Entity
@Table(name = "V_client",catalog = "ztzn",schema = "dbo")
public class VClient {

    @Id
    @GeneratedValue
    private byte SiteNo; //站点编号
    @Column(columnDefinition = "Char(5)")
    private String SiteName="";// 站点名称

    @Column(columnDefinition = "int(5)")
    private Integer Type;//站点级别（0=总站；1=分总站；2=一级分总站；3=二级分总站；>=100非统计站）
    @Column(columnDefinition = "Char(5)")
    private String InstallType;// 手机号码(GPRS-FT6000从该字段获取)

    private Timestamp RecordTime;// 接收时间

    private int Alarm;
    private BigDecimal DifPress ;//差压（Kpa）
    private BigDecimal Press;//压力（Mpa）
    private Integer Tempe;//温度（c）
    private BigDecimal InsFlux; //瞬时流量（T/h）
    private Integer GasTime;// 用气时间
    private Integer EleTime;// 用电时间
    private BigDecimal SumFlux;// 累计流量（T）
    private BigDecimal InsHeat; // 瞬时热量（GJ）
    private BigDecimal SumHeat;// 累计热量（GJ）
    private BigDecimal TodayFlux; //今日流量（T）
    private BigDecimal TodayHeat;// 今日热量（GJ）
    private BigDecimal YesterdayFlux;//昨日流量（T）
    private BigDecimal YesterdayHeat;//昨日热量（GJ）

    private int MediumType;
    private String GroupName="";
    private int GroupId;


    public byte getSiteNo() {
        return SiteNo;
    }

    public int getType() {
        return Type;
    }

    public String getInstallType() {
        return InstallType;
    }

    public Timestamp getRecordTime() {
        return RecordTime;
    }


    public String getSiteName() {
        return SiteName;
    }

    public int getAlarm() {
        return Alarm;
    }

    public BigDecimal getDifPress() {
        return DifPress;
    }

    public BigDecimal getPress() {
        return Press;
    }

    public Integer getTempe() {
        return Tempe;
    }

    public BigDecimal getInsFlux() {
        return InsFlux;
    }

    public Integer getGasTime() {
        return GasTime;
    }

    public Integer getEleTime() {
        return EleTime;
    }

    public BigDecimal getSumFlux() {
        return SumFlux;
    }

    public BigDecimal getInsHeat() {
        return InsHeat;
    }

    public BigDecimal getSumHeat() {
        return SumHeat;
    }

    public BigDecimal getTodayFlux() {
        return TodayFlux;
    }

    public BigDecimal getTodayHeat() {
        return TodayHeat;
    }

    public BigDecimal getYesterdayFlux() {
        return YesterdayFlux;
    }

    public BigDecimal getYesterdayHeat() {
        return YesterdayHeat;
    }

    public int getMediumType() {
        return MediumType;
    }

    public String getGroupName() {
        return GroupName;
    }

    public int getGroupId() {
        return GroupId;
    }

}

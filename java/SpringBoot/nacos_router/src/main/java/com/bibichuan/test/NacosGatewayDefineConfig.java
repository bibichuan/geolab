package com.bibichuan.test;

import com.alibaba.cloud.nacos.NacosConfigProperties;
import com.alibaba.fastjson.JSON;
import com.alibaba.nacos.api.annotation.NacosInjected;
import com.alibaba.nacos.api.config.ConfigService;
import com.alibaba.nacos.api.config.annotation.NacosConfigurationProperties;
import com.alibaba.nacos.api.config.listener.Listener;
import com.alibaba.nacos.api.exception.NacosException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.cloud.gateway.route.RouteDefinition;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.concurrent.Executor;

@Component
@NacosConfigurationProperties(dataId = "${nacos.config.data-id}", autoRefreshed = true, groupId = "${nacos.config.group}")
public class NacosGatewayDefineConfig implements CommandLineRunner {

    private static final Logger log= LoggerFactory.getLogger(NacosGatewayDefineConfig.class);

    @Autowired
    NacosConfigProperties nacosConfigProperties;

    @Value("${nacos.config.data-id}")
    private String dataId;

    @Value("${nacos.config.group}")
    private String group;

    @Autowired
    NacosDynamicRouteService nacosDynamicRouteService;
    /**
     * Callback used to run the bean.
     *
     * @param args incoming main method arguments
     * @throws Exception on error
     */
    @Override
    public void run(String... args) throws Exception {
        addRouteNacosListen();
    }

    /**
     * 添加动态路由监听器
     */
    private void addRouteNacosListen() {
        try {
            ConfigService configService = nacosConfigProperties.configServiceInstance();
            String configInfo = configService.getConfig(dataId, group, 5000);
            getNacosDataRoutes(configInfo);


            //注册Nacos配置更新监听器，用于监听触发
            configService.addListener(dataId, group, new Listener()  {
                @Override
                public void receiveConfigInfo(String configInfo) {
                    log.info("接收到数据:"+configInfo);
                    getNacosDataRoutes(configInfo);
                }
                @Override
                public Executor getExecutor() {
                    return null;
                }
            });

        } catch (NacosException e) {
            log.error("nacos-addListener-error", e);
            e.printStackTrace();
        }
    }

    /**
     * 从Nacos返回的配置
     * @param configInfo
     */
    private void getNacosDataRoutes(String configInfo) {
        List<RouteDefinition> list = JSON.parseArray(configInfo, RouteDefinition.class);
        list.stream().forEach(definition -> {
            log.info(""+JSON.toJSONString(definition));
            nacosDynamicRouteService.update(definition);
        });
    }
}
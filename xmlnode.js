/** DeviceInfo**/ 
var x_DeviceInfo_obj = "DeviceInfo.";
var x_DeviceInfo_SerialNumber = "SerialNumber";
var x_DeviceInfo_HardwareVersion = "HardwareVersion";
var x_DeviceInfo_SoftwareVersion = "SoftwareVersion";
var x_DeviceInfo_mobileSoftversion = "MobileModuleSoftwareVersion";
var x_DeviceInfo_Memory_Total = "MemoryStatus.Total";
var x_DeviceInfo_Memory_Free = "MemoryStatus.Free";
var x_DeviceInfo_ModelName = "ModelName";
var x_DeviceInfo_CPUUsage = "ProcessStatus.CPUUsage";
var x_DeviceInfo_WanInterface = "X_FH_WanInterface";
var x_DeviceInfo_Manufacturer = "Manufacturer";
var x_DeviceInfo_ProductClass = "ProductClass";
var x_DeviceInfo_PopupMethod = "X_FH_Account.X_FH_WebUserInfo.PopupMethod";
var x_FH_VoiceEnable = "X_FH_VoiceEnable";
var x_FH_PrivacyPolicy = "X_FH_Account.PrivacyPolicy";
var x_DeviceInfo_NFC = "X_FH_NFC";
var x_DeviceInfo_LedSwitch = "X_FH_LedControl.Switch";
var x_DeviceInfo_SwitchAutoEnable = "X_FH_SwitchAutoEnable";
var x_DeviceInfo_CurrentWANDevice = "X_FH_CurrentWANDevice" 
var x_DeviceInfo_UplinkCos = "X_UplinkCos";
var X_FH_WorkMode = "X_FH_WorkMode";
var x_DeviceInfo_InternetStatus = "X_FH_InternetStatus";
var x_DeviceInfo_ManagementAddress = "X_FH_ManagementAddress";
var x_DeviceInfo_AggregationEnable = "X_FH_Multiwan_Aggregation.Enable";
var x_DeviceInfo_AggregationWAN1Percent = "X_FH_Multiwan_Aggregation.X_FH_WAN1_Percent";
var x_DeviceInfo_AggregationWAN2Percent = "X_FH_Multiwan_Aggregation.X_FH_WAN2_Percent";
var x_DeviceInfo_Total_Uptime = "X_FH_Multiwan_Total_Uptime";
var x_DeviceInfo_Upstatus = "X_FH_Multiwan_Upstatus";
var x_DeviceInfo_N79 = "X_FH_N79_Enable";
var x_DeviceInfo_ModemModel = "ModemModel";

/**Firewall**/
var x_Firewall_obj = "X_FH_FireWall.";
var x_MACFilter_obj = x_Firewall_obj + "MACFilter.";
var x_MACFilter_MAC = "MAC";
var x_Firewall_MACFEnable = "MACFEnable";
var x_Firewall_MACFMode = "MACFMode";
var x_Firewall_Enable = "Enable";
var x_Firewall_LEVEL = "LEVEL";
var x_Firewall_DOSFEnable = "DOSFEnable";
var x_Firewall_IPv6 = "IPv6FirewallEnable";
var x_Firewall_NATType = "X_FH_NATType";

/**parentControl**/ 
var x_parentalCtrl_obj = x_Firewall_obj + "ParentalCtrl.MAC.";
var x_parentalCtrl_MACAddress = "MACAddress";
var x_parentalCtrl_Description = "Description";
var x_parentalCtrl_TemplateInst = "TemplateInst";
var x_Templates_obj = x_Firewall_obj + "ParentalCtrl.Templates.";
var x_Templates_Name = "Name";
var x_Templates_UrlFilterRight = "UrlFilterRight";
var x_Templates_UrlFilterPolicy = "UrlFilterPolicy";
var x_Duration_obj = "Duration.";
var x_Duration_StartTime = "StartTime";
var x_Duration_EndTime = "EndTime";
var x_Duration_RepeatDay = "RepeatDay";
var x_Url_obj = "UrlFilter.";
var x_Url_UrlAddress = "UrlAddress";
var x_ParentCtrl_Enable = "ParentCtrlEnable";
var x_Templates_DurationRight = "DurationRight";
var x_Templates_DurationPolicy = "DurationPolicy";

/**IPFilter**/
var x_ipFilter_out_Enable = x_Firewall_obj + "IPFilterOutEnable";
var x_ipv6Filter_out_Enable = x_Firewall_obj + "IPv6FilterOutEnable";
var x_ipFilter_out_Policy = x_Firewall_obj + "IPFilterOutPolicy";
var x_ipv6Filter_out_Policy = x_Firewall_obj + "IPv6FilterOutPolicy";
var x_ipFilter_in_Enable = x_Firewall_obj + "IPFilterInEnable";
var x_ipv6Filter_in_Enable = x_Firewall_obj + "IPv6FilterInEnable";
var x_ipFilter_in_Policy = x_Firewall_obj + "IPFilterInPolicy";
var x_ipv6Filter_in_Policy = x_Firewall_obj + "IPv6FilterInPolicy";
var x_ipFilter_in_obj = x_Firewall_obj + "IPFilterIn.";
var x_ipFilter_out_obj = x_Firewall_obj + "IPFilterOut.";
var x_ipv6Filter_in_obj = x_Firewall_obj + "IPV6FilterIn.";
var x_ipv6Filter_out_obj = x_Firewall_obj + "IPV6FilterOut.";
var x_ipFilter_Name = "Name";
var x_ipFilter_Enable = "Enable";
var x_ipFilter_SourceIPStart = "SourceIPStart";
var x_ipFilter_SourceIPEnd = "SourceIPEnd";
var x_ipFilter_DestIPStart = "DestIPStart";
var x_ipFilter_DestIPEnd = "DestIPEnd";
var x_ipFilter_Protocol = "Protocol";
var x_ipFilter_SourcePortStart = "SourcePortStart";
var x_ipFilter_SourcePortEnd = "SourcePortEnd";
var x_ipFilter_DestPortStart = "DestPortStart";
var x_ipFilter_DestPortEnd = "DestPortEnd";
var x_ipFilter_Ipver = "Ipver";
var x_ipFilter_SourceIP6Start = "SourceIP6Start";
var x_ipFilter_SourceIP6End = "SourceIP6End";
var x_ipFilter_DestIP6Start = "DestIP6Start";
var x_ipFilter_DestIP6End = "DestIP6End";

/**alg */
var x_Alg_obj = x_DeviceInfo_obj + "X_FH_ALGAbility.";
var x_Alg_SIPEnable = "SIPEnable";
var x_Alg_L2TPEnable = "L2TPEnable";
var x_Alg_IPSECEnable = "IPSECEnable";
var x_Alg_FTPEnable = "FTPEnable";

/**acl */
var x_ACL_obj = "X_FH_ACL.";
var x_ACL_Enable = "Enable";
var x_ACL_Enable6 = "IPV6Enable";
var x_ACL_RULE_obj = x_ACL_obj + "Rule.";
var x_ACL_RULE_obj6 = x_ACL_obj + "IPV6Rule.";
var x_ACL_Protocol = "Protocol";
var x_ACL_StartIp = "StartIp";
var x_ACL_EndIp = "EndIp";
var x_ACL_Direction = "Direction";

/**Time**/
var x_NTP_Time_obj = "Time.";
var x_NTP_Enable = "Enable";
var x_NTP_NTPServerType = "X_FH_NTPServerType";
var x_NTP_NTPInterval = "X_NTPInterval";
var x_NTP_NTPServer1 = "NTPServer1";
var x_NTP_NTPServer2 = "NTPServer2";
var x_NTP_TimeZone = "LocalTimeZone";
var x_NTP_SyncState = "Status";
var x_NTP_DaylightSavingsUsed = "DaylightSavingsUsed";

/**Port**/
var x_MIRROR_obj = "X_FH_PORT_MIRROR.";
var x_MIRROR_enable = "enable";
var x_MIRROR_src_port = "src_port";
var x_MIRROR_direction = "direction";
var x_MIRROR_dst_port = "dst_port";

/**portForward**/
var x_PortMapping_obj = ".PortMapping.";
var x_PortMapping_InternalClient = "InternalClient";
var x_PortMapping_InternalPort = "InternalPort";
var x_PortMapping_ExternalPort = "ExternalPort";
var x_PortMapping_ExternalPortEnd = "ExternalPortEndRange";
var x_PortMapping_InternalPortEnd = "X_FH_InternalPortEndRange";
var x_PortMapping_PortMappingProtocol = "PortMappingProtocol";
var x_PortMapping_PortMappingEnabled = "PortMappingEnabled";

/**dmz */
var x_DMZ_obj = ".DMZ.";
var x_DMZ_Enable = "Enable";
var x_DMZ_DMZHostIP = "DMZHostIP";

/**ping**/ 
var x_PING_obj = "IPPingDiagnostics.";
var x_PING_host = "Host";
var x_PING_count = "NumberOfRepetitions";
var x_PING_Interface = "Interface";
var x_PING_DiagnosticsState = "DiagnosticsState";
var x_PING_SuccessCount = "SuccessCount";
var x_PING_FailureCount = "FailureCount";
var x_PING_AverageResponseTime = "AverageResponseTime";
var x_PING_MinimumResponseTime = "MinimumResponseTime";
var x_PING_MaximumResponseTime = "MaximumResponseTime";
var x_PING_Timeout = "Timeout";
var x_PING_DataBlockSize = "DataBlockSize";
var x_PING_DSCP = "DSCP";
var x_PING_FH_Owner = "X_FH_Owner";

var x_TRACE_obj = "TraceRouteDiagnostics.";
var x_TRACE_host = "Host";
var x_TRACE_Interface = "Interface";
var x_TRACE_DiagnosticsState = "DiagnosticsState";
var x_TRACE_NumberOfTries = "NumberOfTries";
var x_TRACE_Timeout = "Timeout";
var x_TRACE_DataBlockSize = "DataBlockSize";
var x_TRACE_DSCP = "DSCP";
var x_TRACE_MaxHopCount = "MaxHopCount";
var x_TRACE_DiagnosticsState = "DiagnosticsState";
var x_TRACE_FH_Owner = "X_FH_Owner";

//升级
var X_FH_AutoUpgrade = "X_FH_AutoUpgrade.";
var x_autoUpset_Enable = "Enable";
var x_autoUpset_PlatformUrl = "PlatformUrl";

/**Ftp**/
var x_FTP_obj = x_DeviceInfo_obj + "X_FH_ServiceManage.";
var x_FTP_FtpEnable = "FtpEnable";
var x_FTP_FtpUserName = "FtpUserName";
var x_FTP_FtpPassword = "FtpPassword";
var x_FTP_TelnetEnable = "TelnetEnable";

/**Log**/
var x_LOG_obj = x_DeviceInfo_obj + "X_FH_Syslog.";
var x_LOG_LogViewLevel = "X_FH_LogViewLevel";
var x_LOG_enable = "Enable";
var x_LOG_level = "Level";
var x_Log_switch_obj = x_DeviceInfo_obj + "X_FH_MODULE_LOG.X_FH_LOG_SWITCH."; 
var x_Log_manage_obj = x_DeviceInfo_obj + "X_FH_MODULE_LOG.X_FH_LOG_MANAGE.";
var x_Log_sysmgr = "sysmgr.";
var x_Log_logmgr = "logmgr.";
var x_Log_eventmgr = "eventmgr.";
var x_Log_cfgmgr = "cfgmgr.";
var x_Log_tr069 = "tr069.";
var x_Log_wifimgr = "wifimgr.";
var x_Log_wifiguest = "wifiguest.";
var x_Log_upgrade = "upgrade.";
var x_Log_usbupgrade = "usbupgrade.";
var x_Log_peripheral = "peripheral.";
var x_Log_lancc = "lancc.";
var x_Log_mobilenetwork = "mobilenetwork.";
var x_Log_wancc = "wancc.";
var x_Log_servicemgr = "servicemgr.";
var x_Log_ctcapd = "ctcapd.";
var x_Log_voice = "voice.";
var x_Log_Enable = "Enable";
var x_Log_Level = "Level";

var x_FH_MobileNetwork_obj = "X_FH_MobileNetwork.";
var x_SIM_1_obj = x_FH_MobileNetwork_obj + "SIM.1.";
var x_SIM_1_RoamingConnectStatus = "RoamingConnectStatus";
var x_SIM_1_SIMStatus = "SIMStatus";
var x_SIM_1_IMEI = "IMEI";
var x_SIM_1_IMSI = "IMSI";
var x_SIM_1_NetworkMode = "NetworkMode";
var x_SIM_1_CarrierName = "CarrierName";
var x_SIM_1_PhoneNumber = "PhoneNumber";
var x_SIM_1_RegisterStatus = "RegisterStatus";
var x_SIM_1_plmn = "plmn";
var x_SIM_popNotification = "CarrierSettings.popNotification";
var x_up_notify_obj = "up_notify_obj.";
var x_up_status = "iot_up_status";
var x_up_running = "iot_up_running";
var x_fan_mode = "FanAutoConfig.mode";

var x_pin_lock = "pin_lock";
var x_pin_verify = "pin_verify";
var x_pin_times = "pin_times";
var x_puk_times  = "puk_times";
var x_oper_type = "oper_type";
var x_old_pin = "old_pin";
var x_pin_code = "pin";
var x_puk_code = "puk";
/**Temperature**/
var x_Temperature_obj = x_FH_MobileNetwork_obj + "Temperature.";
var x_Modem4GTemperature = "Modem4GTemperature";
var x_Modem5GTemperature = "Modem5GTemperature";

/** trafficStat **/
var x_TrafficStats_obj = x_FH_MobileNetwork_obj + "TrafficStats.";
var x_TodayTotalTxBytes = "TodayTotalTxBytes";
var x_TodayTotalRxBytes = "TodayTotalRxBytes";
var x_TodayTotalBytes = "TodayTotalBytes";
var x_MonthTxBytes = "MonthTxBytes";
var x_MonthRxBytes = "MonthRxBytes";
var x_MonthTotalBytes = "MonthTotalBytes";
var x_SpeedRxBytes = "SpeedRxBytes";
var x_SpeedTxBytes = "SpeedTxBytes";
var x_TodayThresholdBytes = "TodayThresholdBytes";
var x_MonthThresholdBytes = "MonthThresholdBytes";
var x_TodayThresholdSwitch = "TodayThresholdSwitch";
var x_MonthThresholdSwitch = "monthThresholdSwitch";
var x_TodayExcceed = "TodayExcceed";
var x_MonthExcceed = "MonthExcceed";
var x_MonthStartDay = "MonthStartDay";

var x_NetworkSettings_obj = x_FH_MobileNetwork_obj + "NetworkSettings.";
var x_NetworkSet_NetworkMode = "NetworkMode";
var x_NetworkSet_SearchNetworkMode = "SearchNetworkMode";
var x_NetworkSet_AccessType = "AccessType";
var x_NetworkSet_ENDC = "ENDC";
var x_NetworkSet_CarrierLockEnable = "CarrierLockEnable";
var x_NetworkSet_CarrierSerialNum = "CarrierSerialNum";
var x_NetworkSet_AntennaOutterSwitch = "AntennaOutterSwitch";
var x_NetworkSet_AntennaOutterType = "AntennaOutterSwitch_Type";
var x_NetworkSet_LockBandEnable = "LockBandEnable";
var x_NetworkSet_LTELockBAND = "LTELockBAND";
var x_NetworkSet_NRLockBAND = "NRLockBAND";
var x_NetworkSet_LockBandDisplay = "LockBandDisplay";
var x_NetworkSet_RoamingEnable = "RoamingEnable";
var x_NetworkSet_AirplaneEnable = "airplan_on";
var x_NetworkSet_SMSDisable = "sms_disable";
var x_NetworkSet_CaEnable = "NetworkInfo.CaEnable";
var x_NetworkSet_LTECaEnable = "NetworkInfo.LTECaEnable";
var x_NetworkSet_SmsSwitch = "sms_switch";
var x_NetworkSet_VolteSwitch = "volte_switch";
var x_NetworkSet_PrivateNetwork = "PrivateNetwork";

var x_PINCodeManagement_obj = x_SIM_1_obj + "PINCodeManagement.";
var x_PINCode_PINLockEnable = "PINLockEnable";
var x_PINCode_PINCodeEnable = "PINCodeEnable";
var x_PINCode_PINCode = "PINCode";
var x_PINCode_PUKCode = "PUKCode";
var x_PINCode_OldPINCode = "OldPINCode" ;
var x_PINCode_RemainingTimes= "RemainingTimes";
var x_PINCode_RetCode = "RetCode";
var x_PUKCode_RemainingTimes= "PUKRemainingTimes";

var x_RadioSignalParameter_obj = x_FH_MobileNetwork_obj + "RadioSignalParameter.";
var x_RadioSignal_TAC = "TAC";
var x_RadioSignal_PLMN = "PLMN";
var x_RadioSignal_EARFCN_NBR = "EARFCN_NBR";
var x_RadioSignal_PCI_NBR = "PCI_NBR";
var x_RadioSignal_RSRP_NBR = "RSRP_NBR";
var x_RadioSignal_BAND_NBR = "BAND_NBR";
var x_RadioSignal_SINR_NBR = "SINR_NBR";
var x_RadioSignal_WorkMode = "WorkMode";
var x_RadioSignal_SSB_RSRP = "SSB_RSRP";
var x_RadioSignal_SSB_SINR = "SSB_SINR";
var x_RadioSignal_NR_Band = "NR_Band";
var x_RadioSignal_NR_Power = "NR_Power";
var x_RadioSignal_NR_CQI = "NR_CQI";
var x_RadioSignal_LTE_Power = "LTE_Power";
var x_RadioSignal_LTE_CQI = "LTE_CQI";
var x_RadioSignal_RSRP  = "RSRP";
var x_RadioSignal_RSSI = "RSSI";
var x_RadioSignal_RSRQ = "RSRQ";
var x_RadioSignal_SINR = "SINR";
var x_RadioSignal_PCI = "PCI";
var x_RadioSignal_BAND = "BAND";
var x_RadioSignal_NCGI = "NCGI";
var x_RadioSignal_ECGI = "ECGI";
var x_RadioSignal_SIGNAL_LEVEL = "Signal_Level";
var x_RadioSignal_QCI = "QCI";
var x_RadioSignal_NR_QCI = "NR_QCI";
var x_RadioSignal_DL_AMBR = "DL_AMBR";
var x_RadioSignal_UL_AMBR = "UL_AMBR";
var x_RadioSignal_SPN = "SPN";
var x_RadioSignal_NR_PCI = "NR_PCI";
var x_RadioSignal_SSB_RSSI = "SSB_RSSI";  
var x_RadioSignal_SSB_RSRQ = "SSB_RSRQ"; 
var x_RadioSignal_WCDMA_RSSI = "WCDMA_RSSI";
var x_RadioSignal_WCDMA_RSCP = "WCDMA_RSCP";
var x_RadioSignal_WCDMA_ECIO = "WCDMA_ECIO";
var x_RadioSignal_WCGI = "WCGI";
var x_RadioSignal_WCDMA_PSC = "WCDMA_PSC";

var x_Configuration_Management_obj = x_FH_MobileNetwork_obj + "ConfigurationManagement.Management.";
var x_Management_ProfileName = "ProfileName";
var x_Management_Enable = "Enable";
var x_Management_AuthenticationType = "AuthenticationType";
var x_Management_APN = "APN";
var x_Management_UserName = "UserName";
var x_Management_Password = "Password";
var x_Management_IPMode = "IPMode" ;

/*voice*/ 
var x_Voice_obj = x_FH_MobileNetwork_obj + "Voice.";
var x_VoiceInfo_obj = "InternetGatewayDevice.Services.VoiceService.1.X_FH_CpeVoice.";
var x_Voice_VoiceType = "VoiceType";
var x_Voice_CIDMode = "CIDMode";
var x_Voice_PhoneState = "PhoneState";

/**wan node**/
var x_WANDevice_1_obj = "WANDevice.1.";
var x_WANCommonInterfaceConfig_obj = "WANCommonInterfaceConfig.";
var x_WANAccessType = "WANAccessType";
var x_WANDevice_obj = "WANDevice."
var x_WANConnectionDevice = "WANConnectionDevice.";
var x_WANConnectionDevice_obj = x_WANDevice_1_obj + x_WANConnectionDevice;
var x_wan_WanInterface = "X_FH_WanInterface";
var x_wan_WANEnable = "X_FH_WANENABLE";
var x_WANIPConnection = "WANIPConnection.";
var x_WANPPPConnection = "WANPPPConnection.";
var x_FH_ConnectionTotalTime = "X_FH_ConnectionTotalTime";
var x_wan_IPMode = "X_FH_IPMode";
var x_wan_link_VLANID = "VLANID";
var x_wan_link_Mode = "Mode";
var x_wan_8021pMark = "X_FH_802-1pMark";
var x_wan_Enable = "Enable";
var x_wan_Name = "Name";
var x_wan_ConnectionType = "ConnectionType";
var x_wan_ServiceList = "X_FH_ServiceList";
var x_wan_IPMode = "X_FH_IPMode";
var x_wan_MaxMTUSize = "MaxMTUSize"; //MTU ipoe
var x_wan_CurrentMRUSize = "CurrentMRUSize"; //MTU pppoe
var x_wan_LanInterface = "X_FH_LanInterface";
var x_wan_AddressingType = "AddressingType";
var x_wan_ExternalIPAddress = "ExternalIPAddress";
var x_wan_DNSServers = "DNSServers";
var x_wan_IPv6PrefixDelegationEnabled = "X_FH_IPv6PrefixDelegationEnabled";
var x_wan_IPv6PrefixOrigin = "X_FH_IPv6PrefixOrigin";
var x_wan_IPv6Prefix = "X_FH_IPv6Prefix";
var x_wan_IPv6IPAddressOrigin = "X_FH_IPv6IPAddressOrigin";
var x_wan_IPv6IPAddress = "X_FH_IPv6IPAddress";
var x_wan_DefaultIPv6Gateway = "X_FH_DefaultIPv6Gateway";
var x_wan_IPv6DNSServers = "X_FH_IPv6DNSServers";
var x_wan_Dslite_Enable = "X_FH_Dslite_Enable";
var x_wan_AftrMode = "X_FH_AftrMode";
var x_wan_Aftr = "X_FH_Aftr";
var x_wan_ConnectionStatus = "ConnectionStatus";
var x_wan_IPv6ConnStatus = "X_FH_IPv6ConnStatus";
var x_wan_MFlag = "X_FH_MFlag";
var x_wan_MACAddress = "MACAddress";
var x_wan_Uptime = "Uptime";
var x_wan_NATEnabled = "NATEnabled";
var x_wan_RemoteIPAddress = "RemoteIPAddress";
var x_wan_Username = "Username";
var x_wan_Password = "Password";
var x_wan_ConnectionTrigger = "ConnectionTrigger";
var x_wan_IdleDisconnectTime = "IdleDisconnectTime";
var x_wan_ProxyEnable = "X_FH_ProxyEnable";
var x_wan_MAXUser = "X_FH_MAXUser";
var x_wan_TransportType = "TransportType"; //not ty4
var x_wan_SubnetMask = "SubnetMask";
var x_wan_DefaultGateway = "DefaultGateway";
var x_wan_link_VLANIDMark = "VLANIDMark";
var x_wan_MaxMRUSize = "MaxMRUSize";
var x_wan_PPPoEPassthrough = "X_FH_PPPoEPassthrough";
var x_wan_LastConnectionError = "LastConnectionError";
var x_wan_GponLinkConfig = "X_FH_WANGponLinkConfig.";
var x_wan_MulticastVlan = "X_FH_MulticastVlan";
var x_wan_NPTv6Enable = "X_FH_NPTv6Enable";
var x_wan_UpstreamWAN = "X_FH_UpstreamWAN";
var x_wan_IPForwardList = "X_FH_IPForwardList";
var x_wan_DDNSConfiguration = "X_FH_DDNSConfiguration";

var x_LANDevice_1_obj = "LANDevice.1.";

var x_MainSSIDIndex_58G_obj = "X_FH_Mgt.MainSSIDIndex_58G";
var x_WLANConfiguration = "WLANConfiguration.";
var x_WLANConfiguration_obj = x_LANDevice_1_obj + x_WLANConfiguration;
var x_WLANConfiguration_1_obj = x_WLANConfiguration_obj + "1.";
var x_wifi_ConfigActive = "ConfigActive";
var x_wifi_SSIDAdvertisementEnabled = "SSIDAdvertisementEnabled";
var x_wifi_SSIDAlias = "X_FH_SSIDAlias";
var x_wifi_Channel = "Channel";
var x_wifi_AutoChannelEnable = "AutoChannelEnable";
var x_wifi_TransmitPower = "TransmitPower";
var x_wifi_ChannelsInUse = "ChannelsInUse";
var x_wifi_APModuleEnable = "X_FH_APModuleEnable";
var x_wifi_BeaconType = "BeaconType";
var x_wifi_WPAEncryptionModes = "WPAEncryptionModes";
var x_wifi_Standard = "Standard";
var x_wifi_WMM = "X_FH_WMM";
var x_wifi_ChannelWidth = "X_FH_ChannelWidth";
var x_wifi_RegulatoryDomain = "RegulatoryDomain";
var x_wifi_RadioEnabled = "RadioEnabled";
var x_wifi_AssociateNum = "X_FH_AssociateNum";
var x_wifi_Owner = "X_FH_Owner";
var x_wifi_DiagnosticsState = "DiagnosticsState";
var x_wifi_AssociatedDevice = "AssociatedDevice";
var x_Associ_AssociatedDeviceMACAddress = "AssociatedDeviceMACAddress";
var x_Associ_AssociatedDeviceRSSI = "AssociatedDeviceRSSI";

/**LAN IPv4**/
var x_LANHostConfigManagement_obj = x_LANDevice_1_obj + "LANHostConfigManagement.";
var x_LANHost_IPInterface_1 = "IPInterface.1.";
var x_LANHost_IPInterface_2 = "IPInterface.2.";
var x_LANHost_IPInterfaceIPAddress = "IPInterfaceIPAddress";
var x_LANHost_IPInterfaceSubnetMask = "IPInterfaceSubnetMask";
var x_LANHost_DHCPServerEnable = "DHCPServerEnable";
var x_LANHost_MinAddress = "MinAddress";
var x_LANHost_MaxAddress = "MaxAddress";
var x_LANHost_IPRouters = "IPRouters";
var x_LANHost_DNSServers = "DNSServers";
var x_LANHost_SubnetMask = "SubnetMask";
var x_LANHost_DHCPLeaseTime = "DHCPLeaseTime";
var x_LANHost_DNSConfigType = "X_FH_DNSMode";
var x_LANHost_DNSManualEnable = "X_FH_DNSManualEnable";

//ipv6
var x_IPv6Config_obj = x_LANDevice_1_obj + "X_FH_IPv6Config.";
var x_IPv6_IPv6DNSConfigType = "IPv6DNSConfigType";
var x_IPv6_IPv6DNSServers = "IPv6DNSServers";
var x_IPv6_PrefixInformation_1_obj = x_IPv6Config_obj + "PrefixInformation.1.";
var x_IPv6_Prefix_Prefix = "Prefix";
var x_IPv6_Prefix_Mode = "Mode";
var x_RouterAdvertisement_obj = x_LANDevice_1_obj + "X_FH_RouterAdvertisement.";
var x_Router_AdvManagedFlag = "AdvManagedFlag";
var x_Router_AdvOtherConfigFlag = "AdvOtherConfigFlag";
var x_Router_MaxRtrAdvInterval = "MaxRtrAdvInterval";
var x_Router_MinRtrAdvInterval = "MinRtrAdvInterval";
var x_DHCPv6Server_obj = x_LANDevice_1_obj + "X_FH_DHCPv6Server.";
var x_DHCPv6Server_Enable = "Enable";
var x_DHCPv6Server_MinAddress = "MinAddress";
var x_DHCPv6Server_MaxAddress = "MaxAddress";

// dhcp
var x_StaticDhcp = "X_FH_StaticDhcp.";

/**Host node**/
var x_Hosts_obj = x_LANDevice_1_obj + "Hosts.";
var x_Hosts_EnableDelInactiveDev = "EnableDelInactiveDev";
var x_Hosts_OnlineDevNum = "OnlineDevNum";
var x_Hosts_Host_obj = x_Hosts_obj + "Host.";
var x_Host_HostName = "HostName";
var x_Host_DevName = "DevName";
var x_Host_MacAddress = "MACAddress";
var x_Host_IPAddress = "IPAddress";
var x_Host_IPv6Address = "IPv6Address";
var x_Host_LeaseTimeRemaining = "LeaseTimeRemaining";
var x_Host_DeviceType = "DeviceType";
var x_Host_AckTime = "AckTime";
var x_Host_Active = "Active";
var x_Host_UpSpeed = "UpSpeed";
var x_Host_DownSpeed = "DownSpeed";
var x_Host_MaxUSBandwidth = "MaxUSBandwidth";
var x_Host_MaxDSBandwidth = "MaxDSBandwidth";
var x_Host_InternetAccess = "InternetAccess";
var x_Host_LimitedHostsNumber = "LimitedHostsNumber";
var x_Host_MAXLimitedHostsNumber = "MAXLimitedHostsNumber";
var x_Host_ConnectionType = "ConnectionType";
var x_Host_Port = "Port";
var x_Host_OnlineTime = "OnlineTime";
var x_Host_UseWhichWan = "UseWhichWan"

//tr069 param
var x_MS_obj  = "ManagementServer.";
var x_MS_EnableCWMP = "EnableCWMP";
var x_MS_URL = "URL";
var x_MS_Username = "Username";
var x_MS_Password = "Password";
var x_MS_PeriodicInformEnable = "PeriodicInformEnable";
var x_MS_PeriodicInformInterval = "PeriodicInformInterval";
var x_MS_ConnectionRequestURL = "ConnectionRequestURL";
var x_MS_ConnectionRequestUsername = "ConnectionRequestUsername";
var x_MS_ConnectionRequestPassword = "ConnectionRequestPassword";
var x_MS_Tr069Enable = "Tr069Enable";
var x_MS_ConnectionRequestPath = "X_FH_ConnectionRequestPath";
var x_MS_ConnectionRequestPort = "X_FH_ConnectionRequestPort";
var x_Ms_Handle_Status = "X_FH_Handle_Status";
var x_Ms_ConnectACS_Status = "X_FH_ConnectACS_Status";

var x_MACAddress = "LANDevice.1.LANEthernetInterfaceConfig.1.MACAddress"

/**voice config**/
var x_voiceConfig_obj = "InternetGatewayDevice.Services.VoiceService.1.X_FH_CpeVoice.";
var x_voiceConfig_CIDMode = "CIDMode";
var x_voiceConfig_DialToneTimer = "DialToneTimer";
var x_voiceConfig_RingbackToneTimer = "RingbackToneTimer";
var x_voiceConfig_BusyToneTimer = "BusyToneTimer";
var x_voiceConfig_NoAnswerTimer = "NoAnswerTimer";
var x_voiceConfig_HowlToneTimer = "HowlToneTimer";
var x_voiceConfig_HookFlashUpTime = "HookFlashUpTime";
var x_voiceConfig_HookFlashDownTime = "HookFlashDownTime";

/**SMS**/
var x_SMS_recv_obj = "InternetGatewayDevice.X_FH_MobileNetwork.SMS_Recv.";
var x_SMS_recv_total_obj = x_SMS_recv_obj + "SMSRecvNumberOfEntries";
var x_SMS_recv_msg_obj = x_SMS_recv_obj+ "SMS_RecvMsg.";
var x_SMS_recv_isOpened_obj = "isOpened";
var x_SMS_send_obj = "InternetGatewayDevice.X_FH_MobileNetwork.SMS_Send.";
var x_SMS_send_total_obj = x_SMS_send_obj + "SMSSendNumberOfEntries";
var x_SMS_send_msg_obj = x_SMS_send_obj+ "SMS_SendMsg.";

/**RemoteUpgrade**/
var x_RemoteUpgrade_Switch = "InternetGatewayDevice.X_FH_IotagtdConf.RemoteUpgradeEnable";

/**UPNP**/
var x_UPNP_Enable = "X_FH_UPNP.Enable"
var x_UPNP_Request = "X_FH_UPNP.RequestUpnpRule";
var x_UPNPRULE_Obj = "X_FH_UPNP.UPNPRULE";
var x_UPNPRULE_IPAddress = "IPAddress";
var x_UPNPRULE_Protocol = "Protocol";
var x_UPNPRULE_InternalPort = "InternalPort";
var x_UPNPRULE_ExternalPort = "ExternalPort";
var x_UPNPRULE_Description = "Description";
var x_UPNPRULE_Status= "Status";

/**DDNS**/
var x_DDNS_Enabled = "DDNSCfgEnabled";
var x_DDNS_Provider = "DDNSProvider";
var x_DDNS_DomainName = "DDNSDomainName";
var x_DDNS_UserName = "DDNSUsername";
var x_DDNS_Password = "DDNSPassword";
var x_DDNS_DDNSName = "DDNSName";
var x_DDNS_HostName = "DDNSHostName";
/**LedSleepControl**/
var x_LedSleepControl_obj = x_DeviceInfo_obj + "LedSleepControl.";
var x_Led_Switch = "Switch";
var x_Led_StartTime = "StartTime";
var x_Led_EndTime = "EndTime";

/**PCCInfo**/
var x_PCCInfo_obj = x_FH_MobileNetwork_obj + "NetworkInfo.PCCInfo.";
var x_PCCInfo2_obj = x_FH_MobileNetwork_obj + "NetworkInfo.PCCInfo2.";
var x_PCCInfo_Type = "pccType";
var x_PCCInfo_Band = "pccBand";
var x_PCCInfo_Pci = "pccPci";
var x_PCCInfo_Arfcn = "pccArfcn";
var x_PCCInfo_DlBandWidth = "pccDlBandWidth";
var x_PCCInfo_UlBandWidth = "pccUlBandWidth";
var x_PCCInfo_DlModulation = "pccDlModulation";
var x_PCCInfo_UlModulation = "pccUlModulation";
var x_PCCInfo_DlMimo = "pccDlMimo";
var x_PCCInfo_UlMimo = "pccUlMimo";
var x_PCCInfo_DlRB = "pccDlRB";
var x_PCCInfo_UlRB = "pccUlRB";
var x_PCCInfo_DlMCS = "pccDlMCS";
var x_PCCInfo_UlMCS = "pccUlMCS";
var x_PCCInfo_RANK = "rank";
var x_PCCInfo_Loss = "path_loss";
var x_PCCInfo_PucchTxPower = "pccPucchTxPower";
var x_PCCInfo_CQI = "pccCQI";
var x_PCCInfo_LTEDlTM = "pccLTEDlTM";
var x_PCCInfo_LTEUlTM = "pccLTEUlTM";

var x_NetworkInfo_obj  = x_FH_MobileNetwork_obj + "NetworkInfo.";
var x_NR_pccNumbers = "NR_pccNumbers";
var x_NR_sccNumbers = "NR_sccNumbers";
var x_LTE_pccNumbers = "LTE_pccNumbers";
var x_LTE_sccNumbers = "LTE_sccNumbers";

/**SCCInfos**/
var x_SCCInfo_obj = x_FH_MobileNetwork_obj + "NetworkInfo.SCCInfos.";
var x_SCCInfo_Nums = "sccNumbers";
var x_SCCInfo_Type = "sccType";
var x_SCCInfo_State = "sccState";
var x_SCCInfo_Band = "sccBand";
var x_SCCInfo_Pci = "sccPci";
var x_SCCInfo_Arfcn = "sccArfcn";
var x_SCCInfo_DlBandWidth = "sccDlBandWidth";
var x_SCCInfo_UlBandWidth = "sccUlBandWidth";
var x_SCCInfo_DlMimo = "sccDlMimo";
var x_SCCInfo_UlMimo = "sccUlMimo";
var x_SCCInfo_DlModulation = "sccDlModulation";
var x_SCCInfo_UlModulation = "sccUlModulation";
var x_SCCInfo_DlRB = "sccDlRB";
var x_SCCInfo_UlRB = "sccUlRB";
var x_SCCInfo_DlMCS = "sccDlMCS";
var x_SCCInfo_UlMCS = "sccUlMCS";
var x_SCCInfo_PucchTxPower = "sccPucchTxPower";
var x_SCCInfo_LTEDlTM = "sccLTEDlTM";
var x_SCCInfo_LTEUlTM = "sccLTEUlTM";

/**timeReboot**/
var x_TimedReboot_obj = x_DeviceInfo_obj + "TimedReboot.1.";
var x_TimedReboot_enable = "enable";
var x_TimedReboot_time = "time";
var x_TimedReboot_repeatdays = "week_of_day";

var x_ELT_Output_obj = x_FH_MobileNetwork_obj + "elt.output";

/**QRcode**/
var x_QRcode_enable = "DeviceInfo.X_FH_Account.X_FH_WebUserInfo.X_FH_QRcodeEnable";
var x_QRcode_time = "DeviceInfo.X_FH_Account.X_FH_WebUserInfo.X_FH_QRcodeTime";

/**VPN**/
var x_L2TP_obj = "X_FH_L2TPVPN.Config."
var x_PPTP_obj = "X_FH_PPTPVPN.Config."
var x_STATICROUTE_obj = "X_FH_STATICROUTE.Config."
var x_VPN_name = "vpn_name";
var x_VPN_enable = "Enable";
var x_VPN_status = "vpn_status";
var x_VPN_ClientIp = "client_ip";
var x_VPN_type = "vpn_type";
var x_VPN_addr = "vpn_addr";
var x_VPN_account = "vpn_account";
var x_VPN_pwd = "vpn_pwd";
var x_VPNAdvance_localAddr = "local_addr";
var x_VPNAdvance_MPPEMode = "mppe_mode";
var x_VPNAdvance_MTU = "mtu";
var x_VPNAdvance_DefaultGateway = "default_gw";
var x_VPNAdvance_TunnelHost = "tunnel_host";
var x_VPNAdvance_TunnelPass = "tunnel_pass";
var x_VPNAdvance_IPSecEnable = "ipsec_enable";
var x_VPNAdvance_IPSecPSK = "ipsec_presharekey";
var x_VPNStaticRoute_Interface = "Interface";
var x_VPNStaticRoute_DestIPAddress = "DestIPAddress";
var x_VPNStaticRoute_DestSubnetMask = "DestSubnetMask";
var x_VPNStaticRoute_Enable = "Enable";
var x_VPNAdvance_NATEnable = "nat_enable";

/**IPSec**/
var x_IPSec_obj = "X_FH_IPSecVPN.Config.";
var x_IPSec_Enable = "Enable";
var x_IPSec_IPSecType = "IPSecType";
var x_IPSec_LocalSubnet = "LocalSubnet";
var x_IPSec_RemoteIP = "RemoteIP";
var x_IPSec_RemoteSubnet = "RemoteSubnet";
var x_IPSec_IKEIDType = "IKEIDType"
var x_IPSec_IKEAuthenticationMethod = "IKEAuthenticationMethod";
var x_IPSec_IKEPreshareKey = "IKEPreshareKey";
var x_IPSec_ExchangeMode = "ExchangeMode";
var x_IPSec_IKEAuthenticationAlgorithm = "IKEAuthenticationAlgorithm";
var x_IPSec_IKEEncryptionAlgorithm = "IKEEncryptionAlgorithm";
var x_IPSec_IKEDHGroup = "IKEDHGroup";
var x_IPSec_IPSecTransform = "IPSecTransform";
var x_IPSec_ESPAuthenticationAlgorithm = "ESPAuthenticationAlgorithm"
var x_IPSec_ESPEncryptionAlgorithm = "ESPEncryptionAlgorithm";
var x_IPSec_AHAuthenticationAlgorithm = "AHAuthenticationAlgorithm";
var x_IPSec_IPSecEncapsulationMode = "IPSecEncapsulationMode";
var x_IPSec_IPSecPFS = "IPSecPFS";
var x_IPSec_DPDEnable = "DPDEnable";

var x_IPSec_DPDRetry = "DPDRetry";
var x_IPSec_DPDThreshold = "DPDThreshold";
var x_IPSec_IKERemoteName = "IKERemoteName";
var x_IPSec_IKELocalName = "IKELocalName"

/**LockCellList**/
var x_LockCellList_obj =  x_FH_MobileNetwork_obj + "LockCellList.";
var x_LockCellList_LockCell = "LockCell.";
var x_LockCellList_LockEnable = "LockEnable";
var x_LockCellList_act = "act";
var x_LockCellList_arfcn = "arfcn";
var x_LockCellList_pci = "pci";
var x_LockCellList_post = "post";

//NetworkDetection
var x_NetworkDetection_obj = x_FH_MobileNetwork_obj + "NetworkDetection.";
var x_NetworkDetection_enable = "enable";
var x_NetworkDetection_destination1 = "destination1";
var x_NetworkDetection_destination2 = "destination2";
var x_NetworkDetection_destination3 = "destination3";
var x_NetworkDetection_detectionTimeout = "detectionTimeout";
var x_NetworkDetection_detectionTimeoutAction = "detectionTimeoutAction";

//CarrierSearch
var x_CarrierSearch_obj = x_FH_MobileNetwork_obj + "CarrierSearch.";
var x_CarrierSearch_enable = "enable";
var x_CarrierSearch_start = "start";
var x_CarrierSearchRes_obj = x_CarrierSearch_obj + "CarrierSearchRes.";
var x_CarrierSearchRes_status = "network_status";
var x_CarrierSearchRes_rat = "rat";
var x_CarrierSearchRes_name = "network_name";
var x_CarrierSearchRes_plmn = "plmn";
var x_CarrierSearchSet_obj = x_CarrierSearch_obj + "set_plmn_info.";
var x_CarrierSearchSet_plmn = "plmn";
var x_CarrierSearchSet_rat = "rat";

/**PlatUrl**/
var x_IotagtdConf_PlatUrl = "InternetGatewayDevice.X_FH_IotagtdConf.PlatUrl"

//wifi 3.0
var x_wifi_obj = "WiFi.";
var x_wifi_SSID_obj = x_wifi_obj + "SSID.";
var x_wifi_SSID = "SSID";
var x_wifi_Enable = "Enable";
var x_wifi_LowerLayers = "LowerLayers";
var x_wifi_Radio_obj = x_wifi_obj + "Radio.";
var x_wifi_OperatingStandards = "OperatingStandards";
var x_wifi_AccessPoint_obj = x_wifi_obj + "AccessPoint.";
var x_wifi_ModeEnabled = "Security.ModeEnabled";
var x_wifi_EncryptionMode = "Security.EncryptionMode";
var x_wifi_PreSharedKey = "Security.PreSharedKey";
var x_wifi_MaxAllowedAssociations = "MaxAllowedAssociations";
var x_wifi_SSIDReference = "SSIDReference";
var x_wifi_OperatingChannelBandwidth = "OperatingChannelBandwidth";
var x_wifi_BytesReceived = "Stats.BytesReceived";
var x_wifi_BytesSent = "Stats.BytesSent";
var x_wifi_PacketsReceived = "Stats.PacketsReceived";
var x_wifi_PacketsSent = "Stats.PacketsSent";
var x_wifi_WPSEnable = "WPS.Enable";
var x_wifi_WPSStatus = "WPS.X_FH_WPSStatus";
var x_wifi_ConfigMethodsEnabled = "WPS.ConfigMethodsEnabled"; //PushButton PIN

var x_wifi_MultiLinkGroup_obj = "WiFi.X_FH_MultiLinkGroup.";
var x_wifi_SSIDIndex = "SSIDIndex"
var x_wifi_MlgroupAddr = "MlgroupAddr"
var x_wifi_WifiBandSteering_obj = "WiFi.WifiBandSteering.";
var x_wifi_IsolationEnable = "IsolationEnable";

/*Neighbor*/
var x_wifi_NeighboringWiFiDiagnostic = x_wifi_obj + "NeighboringWiFiDiagnostic.";
var  x_wifi_NeighborResult_obj = "Result.";
var x_wifi_NeighborSSID = "SSID";
var x_wifi_NeighborBSSID = "BSSID";
var x_wifi_NeighborChannel ="Channel";
var x_wifi_NeighborSignal = "SignalStrength";
var x_wifi_NeighborMode = "SecurityModeEnabled";


/** TOPO **/
var x_MultiAP_obj = "WiFi.MultiAP.";
var x_MultiAP_Enable = "Enable";
var x_MultiAP_Mode = "Mode";
var x_APDevice_obj = "WiFi.MultiAP.APDevice.";
var x_APDevice_Active = "X_FH_Active";
var x_APDevice_ParentMACAddress = "X_FH_ParentMACAddress";
var x_APDevice_MACAddress = "MACAddress";
var x_APDevice_BackhaulLinkType = "BackhaulLinkType";
var x_AP_Radio_obj = "Radio.";
var x_AP_Radio_OperatingFrequencyBand = "OperatingFrequencyBand";
var x_Radio_AP_obj = "AP.";
var x_AssociatedDevice_obj = "AssociatedDevice.";
var x_AssociatedDevice_MACAddress = "MACAddress";
var x_AssociatedDevice_Active = "Active";
var x_AssociatedDevice_SignalStrength = "SignalStrength";
var x_AssociatedDevice_PHYRate = "X_FH_PHYRate";
var x_AssociatedDevice_Security = "Security";

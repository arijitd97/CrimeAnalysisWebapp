======================================================
Oracle Free Use Terms and Conditions (FUTC) License 
======================================================
https://www.oracle.com/downloads/licenses/oracle-free-license.html
===================================================================

ojdbc8-full.tar.gz - JDBC Thin Driver and Companion JARS
========================================================
This TAR archive (ojdbc8-full.tar.gz) contains the 19.12 release of the Oracle JDBC Thin driver(ojdbc8.jar), the Universal Connection Pool (ucp.jar) and other companion JARs grouped by category. 

(1) ojdbc8.jar (4,413,949 bytes) - 
(SHA1 Checksum: e36d2100830e2cf7c63e9972e84ecf35e26f7bc0)
Oracle JDBC Driver compatible with JDK8, JDK9, and JDK11;
(2) ucp.jar (1,689,272 bytes) - (SHA1 Checksum: 47909303355c4aed5316248f346129c1d7f2a666)
Universal Connection Pool classes for use with JDK8, JDK9, and JDK11 -- for performance, scalability, high availability, sharded and multitenant databases.
(3) ojdbc.policy (11,515 bytes) - Sample security policy file for Oracle Database JDBC drivers

======================
Security Related JARs
======================
Java applications require some additional jars to use Oracle Wallets. 
You need to use all the three jars while using Oracle Wallets. 

(4) oraclepki.jar (306,014 bytes) - (SHA1 Checksum: 7ccabd19c7b480276fcafdd05dcd70a10990ce97)
Additional jar required to access Oracle Wallets from Java
(5) osdt_cert.jar (210,337 bytes) - (SHA1 Checksum: c604505476f7740bc6445e52fb72f55fe93b801e)
Additional jar required to access Oracle Wallets from Java
(6) osdt_core.jar (312,201 bytes) - (SHA1 Checksum: 87f2a2169efd9e03ceb58642736735a6ef8d1b36)
Additional jar required to access Oracle Wallets from Java

=============================
JARs for NLS and XDK support 
=============================
(7) orai18n.jar (1,663,954 bytes) - (SHA1 Checksum: 5069a96062efa428d0b688eaf201a7e81d29c750) 
Classes for NLS support
(8) xdb.jar (265,580 bytes) - (SHA1 Checksum: d4136414bfb575a8afc6fb0659da15b78e1e8ff7)
Classes to support standard JDBC 4.x java.sql.SQLXML interface 
(9) xmlparserv2.jar (1,935,495 bytes) - (SHA1 Checksum: 7a078569e23df2e7a034dedaccec31137b3bbd26)
Classes to support standard JDBC 4.x java.sql.SQLXML interface 
====================================================
JARs for Real Application Clusters(RAC), ADG, or DG 
====================================================
(10) ons.jar (156,244 bytes) - (SHA1 Checksum: f46f884953eaf4f5e5682f850b81df580a270f7f)
for use by the pure Java client-side Oracle Notification Services (ONS) daemon
(11) simplefan.jar (32,169 bytes) - (SHA1 Checksum: 416e86abe9df8a4030fd3817bf3164fed129b341)
Java APIs for subscribing to RAC events via ONS; simplefan policy and javadoc

=================
USAGE GUIDELINES
=================
Refer to the JDBC Developers Guide (https://docs.oracle.com/en/database/oracle/oracle-database/19/jjdbc/index.html) and Universal Connection Pool Developers Guide (https://docs.oracle.com/en/database/oracle/oracle-database/19/jjucp/index.html)for more details. 

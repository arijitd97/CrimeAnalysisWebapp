package hibernate.HibernateTest;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.cfg.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins= {"http://localhost:4200", "http://10.20.106.23:4200"})
@RestController
//@RequestMapping("/api")
public class Display {
	
	Configuration con = new Configuration().configure().addAnnotatedClass(Employee.class).addAnnotatedClass(Department.class).addAnnotatedClass(Alien.class);
//	
	SessionFactory sf = con.buildSessionFactory();
//	
	Session session = sf.openSession();
	
//	Session session;

	public Session getSession() {
		return session;
	}

	public void setSession(Session session) {
		this.session = session;
	}
	
	
//////////////////////////////////////////////////////////////////////////////
	
@SuppressWarnings("unchecked")
@RequestMapping(method = RequestMethod.GET,produces="application/json",
value = "/api/countTuples")
//@GetMapping("/intervalRate")
public ResponseEntity<BigDecimal> countRows() {
//public void query1() {
Transaction tx1 = session.beginTransaction();
//int in=timeInterval.indexOf('-');
//
//String startTime=timeInterval.substring(0, in);
//String endTime=timeInterval.substring(in+1);
List<Object> employees = session.createNativeQuery("select sum(A.count) from\n"
		+ "(select count(*) as count from \"PARCHA.SRIKANTHR\".ARRESTEE\n"
		+ "UNION ALL\n"
		+ "select count(*)as count from \"PARCHA.SRIKANTHR\".BIAS_LIST\n"
		+ "UNION ALL\n"
		+ "select count(*)as count from \"PARCHA.SRIKANTHR\".BIAS_MOTIVATION\n"
		+ "UNION ALL\n"
		+ "select count(*)as count from \"PARCHA.SRIKANTHR\".INCIDENT\n"
		+ "UNION ALL\n"
		+ "select count(*)as count from \"PARCHA.SRIKANTHR\".LOCATION_TYPE\n"
		+ "UNION ALL\n"
		+ "select count(*)as count from \"PARCHA.SRIKANTHR\".OFFENDER\n"
		+ "UNION ALL\n"
		+ "select count(*)as count from \"PARCHA.SRIKANTHR\".OFFENSE\n"
		+ "UNION ALL\n"
		+ "select count(*)as count from \"PARCHA.SRIKANTHR\".OFFENSE_TYPE\n"
		+ "UNION ALL\n"
		+ "select count(*)as count from \"PARCHA.SRIKANTHR\".REF_RACE\n"
		+ "UNION ALL\n"
		+ "select count(*)as count from \"PARCHA.SRIKANTHR\".RELATIONSHIP\n"
		+ "UNION ALL\n"
		+ "select count(*)as count from \"PARCHA.SRIKANTHR\".VICTIM\n"
		+ "UNION ALL\n"
		+ "select count(*)as count from \"PARCHA.SRIKANTHR\".VICTIM_OFFENDER_REL\n"
		+ "UNION ALL\n"
		+ "select count(*)as count from \"PARCHA.SRIKANTHR\".VICTIM_OFFENSE)A").list();
System.out.println(employees.get(0));
BigDecimal count = (BigDecimal) employees.get(0);
//double c =  (double)employees.get(0);
//session.save(human);
//for (Object[] objects : employees) {
////Integer month=Integer.valueOf(objects[2]);
////Integer count = (Integer) id;
////String name=(String)objects[1];
//System.out.println("Month["+objects[2]+"]");
//}
tx1.commit();

System.out.println("Successful");
return new ResponseEntity<>( count, HttpStatus.OK);

}

	//////////////////////////////////////////////////////////////////////////////
	
	@SuppressWarnings("unchecked")
	@RequestMapping(method = RequestMethod.GET,produces="application/json",
    value = "/api/raceRelation")
//	@GetMapping("/intervalRate")
	public ResponseEntity<List<Object[]>> query5(@RequestParam String race, @RequestParam String startYear, @RequestParam String endYear) {
	//public void query1() {
		Transaction tx1 = session.beginTransaction();
//		int in=timeInterval.indexOf('-');
//		
//		String startTime=timeInterval.substring(0, in);
//		String endTime=timeInterval.substring(in+1);
		System.out.println("\n\nrace is :"+race);
    	List<Object[]> employees = session.createNativeQuery("select  count(offense_id), year, month from\n"
    			+ "(select offender_id, victim_id from \"PARCHA.SRIKANTHR\".victim_offender_rel where relationship_id in (5,6,10,11,13,15,17,19,20,21,22,23,26)) \n"
    			+ "NATURAL JOIN\n"
    			+ "(select offender_id, incident_id from \"PARCHA.SRIKANTHR\".offender NATURAL JOIN \"PARCHA.SRIKANTHR\".REF_RACE where race_desc=:Race ) \n"
    			+ "NATURAL JOIN \"PARCHA.SRIKANTHR\".victim NATURAL JOIN (select incident_id, to_char(INCIDENT_DATE, 'YYYY') as Year, to_char(INCIDENT_DATE, 'MM') as Month\n"
    			+ "from \"PARCHA.SRIKANTHR\".incident\n"
    			+ "where to_char(INCIDENT_DATE, 'YYYY') >= :StartYear and to_char(INCIDENT_DATE, 'YYYY') <= :EndYear)\n"
    			+ " NATURAL JOIN \"PARCHA.SRIKANTHR\".offense group by year, month\n"
    			+ " order by year, month")
    			.setParameter("Race", race)
    			.setParameter("StartYear",startYear)
    			.setParameter("EndYear", endYear)
    			.list();
    	System.out.println(employees);
//    	session.save(human);
//    	for (Object[] objects : employees) {
//            //Integer month=Integer.valueOf(objects[2]);
////            Integer count = (Integer) id;
////            String name=(String)objects[1];
//            System.out.println("Month["+objects[2]+"]");
//         }
    	tx1.commit();
    	
    	System.out.println("Successful");
    	return new ResponseEntity<>(employees, HttpStatus.OK);
    	
	}
	
	//////////////////////////////////////////////////////////////////////////////
	
	@SuppressWarnings("unchecked")
	@RequestMapping(method = RequestMethod.GET,produces="application/json",
    value = "/api/byCrimeLocation")
	public ResponseEntity<List<Object[]>> query4(@RequestParam String locationType, @RequestParam String startYear, @RequestParam String endYear) {
	//public void query1() {
		Transaction tx1 = session.beginTransaction();
    	
		System.out.println("location type is : "+locationType);
		
    	List<Object[]> employees = session.createNativeQuery("SELECT COUNT(*) AS TOTAL, year, month, LOCATION_TYPE\n"
    			+ "FROM \n"
    			+ "(SELECT * FROM \"PARCHA.SRIKANTHR\".OFFENSE NATURAL JOIN\n"
    			+ "(select incident_id, to_char(INCIDENT_DATE, 'YYYY') as Year, to_char(INCIDENT_DATE, 'MM') as Month\n"
    			+ "from \"PARCHA.SRIKANTHR\".incident\n"
    			+ "where to_char(INCIDENT_DATE, 'YYYY') >= :startYear \n"
    			+ "and to_char(INCIDENT_DATE, 'YYYY') <= :endYear)) NATURAL JOIN \"PARCHA.SRIKANTHR\".LOCATION_TYPE\n"
    			+ "where LOCATION_TYPE = :locationType\n"
    			+ "\n"
    			+ "GROUP BY Year, Month, LOCATION_TYPE ORDER BY YEAR,MONTH")
    			.setParameter("startYear",startYear)
    			.setParameter("endYear", endYear)
    			.setParameter("locationType",locationType)
    			.list();
    	System.out.println(employees);
    	tx1.commit();
 
    	System.out.println("Successful");
    	return new ResponseEntity<>(employees, HttpStatus.OK);
	}

	
	//////////////////////////////////////////////////////////////////////////////
	@SuppressWarnings("unchecked")
	@RequestMapping(method = RequestMethod.GET,produces="application/json",
    value = "/api/ageGroupRate")
	//@GetMapping("/ageGroupRate")
	public ResponseEntity<HashMap <String, List<Object[]>>> query3(@RequestParam String timeInterval , @RequestParam String startYear, @RequestParam String endYear) {
	//public void query1() {
		Transaction tx1 = session.beginTransaction();
    	
		int in=timeInterval.indexOf('-');
		
		String startTime=timeInterval.substring(0, in);
		String endTime=timeInterval.substring(in+1);
		
    	List<Object[]> employees = session.createNativeQuery("WITH TEMP as ( select victim_id, age_num,\n"
    			+ "CASE \n"
    			+ "    WHEN age_num <=15\n"
    			+ "    THEN 'Kids' \n"
    			+ "    WHEN age_num>15 and age_num<=25\n"
    			+ "    THEN 'Teens' \n"
    			+ "    WHEN age_num>25 and age_num<=40\n"
    			+ "    THEN 'Adults'\n"
    			+ "    WHEN age_num>40 and age_num<=60\n"
    			+ "    THEN 'MiddleAge'\n"
    			+ "    WHEN age_num>60\n"
    			+ "    THEN 'Above60'\n"
    			+ "  END AGE_GROUP\n"
    			+ "\n"
    			+ "from \"PARCHA.SRIKANTHR\".victim)\n"
    			+ "\n"
    			+ "SELECT COUNT(*) AS TOTAL, year, month, AGE_GROUP\n"
    			+ "from  TEMP NATURAL JOIN \"PARCHA.SRIKANTHR\".VICTIM_OFFENSE NATURAL JOIN \n"
    			+ "(SELECT * FROM \"PARCHA.SRIKANTHR\".OFFENSE) NATURAL JOIN\n"
    			+ "(select incident_id, to_char(INCIDENT_DATE, 'YYYY') as Year, to_char(INCIDENT_DATE, 'MM') as Month\n"
    			+ "from \"PARCHA.SRIKANTHR\".incident\n"
    			+ "where to_char(INCIDENT_DATE, 'YYYY') >= :startYear and to_char(INCIDENT_DATE, 'YYYY') <= :endYear \n"
    			+ "and incident_hour >= :startTime and incident_hour <= :endTime)\n"
    			+ "\n"
    			+ "GROUP BY Year, Month,AGE_GROUP ORDER BY AGE_GROUP, YEAR,MONTH")
    			.setParameter("startYear",startYear)
    			.setParameter("endYear", endYear)
    			.setParameter("startTime",Integer.valueOf(startTime))
    			.setParameter("endTime", Integer.valueOf(endTime))
    			.list();
    	System.out.println(employees);
    	tx1.commit();
//    	session.save(human);
    	HashMap <String, List<Object[]>> output=new HashMap <String, List<Object[]>>();
//    	String key="";
//    	HashMap<String,String> keyDict= new HashMap<String,String>();
//    	keyDict.put("0-12", "Kids");
//    	keyDict.put("13-19", "Teens");
//    	keyDict.put("20-35", "YoungAdults");
//    	keyDict.put("35-60", "Adults");
//    	keyDict.put("Above 60", "Above60");
//    	
    	
    	for (Object[] objects : employees) 
    	{ 
    		
    		List < Object[]> records= new ArrayList<Object[]> ();
    		Object[] item=new Object[3];
    		item[0]=objects[0];
			item[1]=objects[1];
			item[2]=objects[2];
//			String keyItem=keyDict.get(String.valueOf(objects[3]));
    		if (output.containsKey(objects[3]))
    		{
    			records= output.get(objects[3]);
    			
    			records.add(item);
    			
    				
    		}
    		else 
    		{
    			records.add(item);
    			
    			output.put(String.valueOf(objects[3]), records);
    			
    		}
    	}
    	
 
    	System.out.println("Successful");
    	return new ResponseEntity<>(output, HttpStatus.OK);
	}
	
	/////////////////////////////////////////////////////////////////////////////
	
	
	@SuppressWarnings("unchecked")
	@RequestMapping(method = RequestMethod.GET,produces="application/json",
    value = "/api/raceOffenseType")
	public ResponseEntity<HashMap <String, List<Object[]>>> query2(@RequestParam String offenseType , @RequestParam String startYear, @RequestParam String endYear) {
	//public void query1() {
		Transaction tx1 = session.beginTransaction();
    	
		System.out.println("\n\nOffense Type : "+offenseType);
		
    	List<Object[]> employees = session.createNativeQuery("WITH TEMP AS (select offender_id,incident_id,race_desc,\n"
    			+ "CASE race_id\n"
    			+ "    WHEN 0\n"
    			+ "    THEN 'Unknown' \n"
    			+ "    WHEN 99\n"
    			+ "    THEN 'Unknown' \n"
    			+ "    WHEN 4\n"
    			+ "    THEN 'Asian'\n"
    			+ "    WHEN 5\n"
    			+ "    THEN 'Asian'\n"
    			+ "    WHEN 6\n"
    			+ "    THEN 'Asian'\n"
    			+ "    WHEN 7\n"
    			+ "    THEN 'Asian'\n"
    			+ "    WHEN 8\n"
    			+ "    THEN 'Asian'\n"
    			+ "    ELSE RACE_DESC\n"
    			+ "  END RACE\n"
    			+ "FROM  \"PARCHA.SRIKANTHR\".offender\n"
    			+ "NATURAL JOIN \"PARCHA.SRIKANTHR\".REF_RACE)\n"
    			+ "\n"
    			+ "select count(offender_id), Year, Month, race from TEMP\n"
    			+ "NATURAL JOIN (select incident_id, to_char(INCIDENT_DATE, 'YYYY') as Year, to_char(INCIDENT_DATE, 'MM') as Month\n"
    			+ "from \"PARCHA.SRIKANTHR\".incident\n"
    			+ "where to_char(INCIDENT_DATE, 'YYYY') >= :startYear and to_char(INCIDENT_DATE, 'YYYY') <= :endYear ) \n"
    			+ "NATURAL JOIN  \n"
    			+ "(select * from \"PARCHA.SRIKANTHR\".offense NATURAL JOIN \n"
    			+ "\n"
    			+ "\"PARCHA.SRIKANTHR\".offense_type where offense_category_name= :offenseType) \n"
    			+ "group by race, Year, Month order by  Year, Month,race")
    			.setParameter("startYear",startYear)
    			.setParameter("endYear", endYear)
    			.setParameter("offenseType",offenseType)
    			.list();
    	System.out.println(employees);
    	tx1.commit();
    	HashMap <String, List<Object[]>> output=new HashMap <String, List<Object[]>>();
    	
    	for (Object[] objects : employees){ 
    		
    		List < Object[]> records= new ArrayList<Object[]> ();
    		Object[] item=new Object[3];
    		item[0]=objects[0];
			item[1]=objects[1];
			item[2]=objects[2];
			if(objects[3].equals("Unknown")) objects[3]="unknown";
			else if(objects[3].equals("Black or African American")) objects[3]="black";
			else if(objects[3].equals("White")) objects[3]="white";
			else if(objects[3].equals("American Indian or Alaska Native")) objects[3]="americanIndian";
			else if(objects[3].equals("Asian")) objects[3]="asian";
		
			
//			String keyItem=keyDict.get(String.valueOf(objects[3]));
    		if (output.containsKey(objects[3])){
    			records= output.get(objects[3]);
    			records.add(item);
    		}
    		else {
    			records.add(item);
    			
    			output.put(String.valueOf(objects[3]), records);
    		}
    	}
    	
 
    	System.out.println("Successful");
    	return new ResponseEntity<>(output, HttpStatus.OK);
	}
	
	/////////////////////////////////////////////////////////////////////////////
	
	@SuppressWarnings("unchecked")
	@RequestMapping(method = RequestMethod.GET,produces="application/json",
    value = "/api/intervalRate")
	@GetMapping("/intervalRate")
	public ResponseEntity<List<Object[]>> query1(@RequestParam String timeInterval, @RequestParam String startYear, @RequestParam String endYear) {
	//public void query1() {
		Transaction tx1 = session.beginTransaction();
		int in=timeInterval.indexOf('-');
		
		String startTime=timeInterval.substring(0, in);
		String endTime=timeInterval.substring(in+1);
    	List<Object[]> employees = session.createNativeQuery("SELECT count(*), year, month\n"
    			+ "from (\n"
    			+ "        select incident_id, to_char(INCIDENT_DATE, 'YYYY') as Year, to_char(INCIDENT_DATE, 'MM') as Month\n"
    			+ "        from \"PARCHA.SRIKANTHR\".incident\n"
    			+ "        where to_char(INCIDENT_DATE, 'YYYY') >= :StartYear and to_char(INCIDENT_DATE, 'YYYY') <= :EndYear\n"
    			+ "        and incident_hour >= :StartTime and incident_hour <= :EndTime\n"
    			+ "     )\n"
    			+ "Group By Year, Month\n"
    			+ "Order by year, month")
    			.setParameter("StartTime",Integer.valueOf(startTime))
    			.setParameter("EndTime", Integer.valueOf(endTime))
    			.setParameter("StartYear",startYear)
    			.setParameter("EndYear", endYear)
    			.list();
    	System.out.println(employees);
//    	session.save(human);
    	for (Object[] objects : employees) {
            //Integer month=Integer.valueOf(objects[2]);
//            Integer count = (Integer) id;
//            String name=(String)objects[1];
            System.out.println("Month["+objects[2]+"]");
         }
    	tx1.commit();
    	
    	System.out.println("Successful");
    	return new ResponseEntity<>(employees, HttpStatus.OK);
    	
	}
	
	



}

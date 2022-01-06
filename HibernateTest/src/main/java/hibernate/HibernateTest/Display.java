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
	
	Configuration con = new Configuration().configure();
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
List<Object> obj = session.createNativeQuery("select sum(A.count) from\n"
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
System.out.println(obj.get(0));
BigDecimal count = (BigDecimal) obj.get(0);
tx1.commit();

System.out.println("Successful");
return new ResponseEntity<>( count, HttpStatus.OK);

}

	//////////////////////////////////////////////////////////////////////////////
	
@SuppressWarnings("unchecked")
@RequestMapping(method = RequestMethod.GET,produces="application/json",
value = "/api/raceRelation")
public ResponseEntity<HashMap <String, List<Object[]>>> raceFamilyQuery5 (@RequestParam String relation,@RequestParam String startYear, @RequestParam String endYear) {

	Transaction tx1 = session.beginTransaction();
	List<Object[]> obj = session.createNativeQuery("WITH TEMP AS ( select relationship_id, relationship_name, \n"
			+ "CASE \n"
			+ "WHEN relationship_id=6 or relationship_id=26 or relationship_id=21\n"
			+ "THEN 'Spouse'\n"
			+ "WHEN relationship_id=5\n"
			+ "THEN 'Child'\n"
			+ "WHEN relationship_id=17\n"
			+ "THEN 'Parent'\n"
			+ "WHEN relationship_id=19\n"
			+ "THEN 'Sibling'\n"
			+ "WHEN relationship_id=20\n"
			+ "THEN 'Stepchildren'\n"
			+ "WHEN relationship_id=11\n"
			+ "THEN 'Grandparent'\n"
			+ "WHEN relationship_id=10\n"
			+ "THEN 'Grandchild'\n"
			+ "WHEN relationship_id=13\n"
			+ "THEN 'Inlaw'\n"
			+ "WHEN relationship_id=22\n"
			+ "THEN 'Stepparent'\n"
			+ "WHEN relationship_id=23\n"
			+ "THEN 'Stepsibling'\n"
			+ "WHEN relationship_id=26\n"
			+ "THEN 'ExSpouse'\n"
			+ "END rel_type\n"
			+ "FROM \"PARCHA.SRIKANTHR\".relationship)\n"
			+ "\n"
			+ "\n"
			+ "select  count(offense_id), year, month, race_desc from\n"
			+ "(select offender_id, victim_id,relationship_id from \"PARCHA.SRIKANTHR\".victim_offender_rel NATURAL JOIN TEMP where rel_type=:relType) \n"
			+ "NATURAL JOIN\n"
			+ "(select offender_id, incident_id,race_desc from \"PARCHA.SRIKANTHR\".offender NATURAL JOIN \"PARCHA.SRIKANTHR\".REF_RACE )\n"
			+ "NATURAL JOIN \"PARCHA.SRIKANTHR\".victim NATURAL JOIN (select incident_id, to_char(INCIDENT_DATE, 'YYYY') as Year, to_char(INCIDENT_DATE, 'MM') as Month\n"
			+ "from \"PARCHA.SRIKANTHR\".incident\n"
			+ "where to_char(INCIDENT_DATE, 'YYYY') >=:StartYear and to_char(INCIDENT_DATE, 'YYYY') <=:EndYear)\n"
			+ " NATURAL JOIN \"PARCHA.SRIKANTHR\".offense group by race_desc,year, month\n"
			+ " order by race_desc,year, month")
			.setParameter("relType", relation)
			.setParameter("StartYear",startYear)
			.setParameter("EndYear", endYear)
			.list();
	System.out.println(obj);
	tx1.commit();
	HashMap <String, List<Object[]>> output=new HashMap <String, List<Object[]>>();
	
	for (Object[] objects : obj){ 
		
		List < Object[]> records= new ArrayList<Object[]> ();
		Object[] item=new Object[3];
		item[0]=objects[0];
		item[1]=objects[1];
		item[2]=objects[2];
		if(objects[3].equals("Black or African American")) 
			{objects[3]="black";
			BigDecimal count = (BigDecimal) item[0];
			item[0] = (count.doubleValue()*1000000)/ 3746469.00;
			}
		else if(objects[3].equals("White")) 
		{	objects[3]="white";
			BigDecimal count = (BigDecimal) item[0];
			item[0] = (count.doubleValue()*1000000)/ 22819758.00;
		}
		else if(objects[3].equals("Asian")) 
		{ 
			objects[3]="asian";
			BigDecimal count = (BigDecimal) item[0];
			item[0] = (count.doubleValue()*1000000)/ 1507786.00;
		}
		
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
	
	//////////////////////////////////////////////////////////////////////////////
	
	@SuppressWarnings("unchecked")
	@RequestMapping(method = RequestMethod.GET,produces="application/json",
    value = "/api/byCrimeLocation")
	public ResponseEntity<List<Object[]>> locationCrime(@RequestParam String locationType, @RequestParam String startYear, @RequestParam String endYear) {
		Transaction tx1 = session.beginTransaction();
    	
		System.out.println("location type is : "+locationType);
		
    	List<Object[]> obj = session.createNativeQuery("SELECT COUNT(*) AS TOTAL, year, month, LOCATION_TYPE\n"
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
    	System.out.println(obj);
    	tx1.commit();
 
    	System.out.println("Successful");
    	return new ResponseEntity<>(obj, HttpStatus.OK);
	}

	
	//////////////////////////////////////////////////////////////////////////////
	@SuppressWarnings("unchecked")
	@RequestMapping(method = RequestMethod.GET,produces="application/json",
    value = "/api/ageGroupRate")
	public ResponseEntity<HashMap <String, List<Object[]>>> ageTimeInterval(@RequestParam String timeInterval , @RequestParam String startYear, @RequestParam String endYear) {
		Transaction tx1 = session.beginTransaction();
    	
		int in=timeInterval.indexOf('-');
		
		String startTime=timeInterval.substring(0, in);
		String endTime=timeInterval.substring(in+1);
		
    	List<Object[]> obj = session.createNativeQuery("WITH TEMP as ( select victim_id, age_num,\n"
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
    	System.out.println(obj);
    	tx1.commit();
    	HashMap <String, List<Object[]>> output=new HashMap <String, List<Object[]>>();
    	
    	for (Object[] objects : obj) 
    	{ 
    		List < Object[]> records= new ArrayList<Object[]> ();
    		Object[] item=new Object[3];
    		item[0]=objects[0];
			item[1]=objects[1];
			item[2]=objects[2];
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
	public ResponseEntity<HashMap <String, List<Object[]>>> raceOffenseType(@RequestParam String offenseType , @RequestParam String startYear, @RequestParam String endYear) {
		Transaction tx1 = session.beginTransaction();
    	
		System.out.println("\n\nOffense Type : "+offenseType);
		
    	List<Object[]> obj = session.createNativeQuery("WITH TEMP AS (select offender_id,incident_id,race_desc,\n"
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
//    	System.out.println(obj);
    	tx1.commit();
    	HashMap <String, List<Object[]>> output=new HashMap <String, List<Object[]>>();
    	
    	for (Object[] objects : obj){ 
    		List < Object[]> records= new ArrayList<Object[]> ();
    		Object[] item=new Object[3];
    		item[0]=objects[0];
			item[1]=objects[1];
			item[2]=objects[2];
			if(objects[3].equals("Unknown")) objects[3]="unknown";
			if(objects[3].equals("Black or African American")) 
			{objects[3]="black";
			// item[0]=(Double)item[0]/ (Double)3746468.649;
			BigDecimal count = (BigDecimal) item[0];
			item[0] = (count.doubleValue()*1000000.00)/ 3746469.00;
			}
			else if(objects[3].equals("White")) 
			{	objects[3]="white";
				//item[0]=(BigDecimal)item[0]/ 22819758.347;  //22819758.347
				BigDecimal count = (BigDecimal) item[0];
				item[0] = (count.doubleValue()*1000000.00)/ 22819758.0;
			}
			else if(objects[3].equals("American Indian or Alaska Native")) objects[3]="americanIndian";
			else if(objects[3].equals("Asian")) 
			{ 
			objects[3]="asian";
			BigDecimal count = (BigDecimal) item[0];
			item[0] = (count.doubleValue()*1000000.00)/ 1507786.00;
			}

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
	public ResponseEntity< HashMap <String, List<Object[]>>>intervalRate(@RequestParam String startYear, @RequestParam String endYear) {
		Transaction tx1 = session.beginTransaction();
    	List<Object[]> obj = session.createNativeQuery("With temp as (select  incident_id, INCIDENT_DATE, incident_hour, \n"
    			+ "CASE \n"
    			+ "	When incident_hour >0 and  incident_hour <=4\n"
    			+ "THEN 'midnight'\n"
    			+ "When incident_hour >4 and  incident_hour <=8\n"
    			+ "THEN 'earlyMorning'\n"
    			+ "When incident_hour >8 and  incident_hour <=12\n"
    			+ "THEN 'morning'\n"
    			+ "When incident_hour >12 and  incident_hour <=16\n"
    			+ "THEN 'afternoon'\n"
    			+ "When incident_hour >16 and  incident_hour <=20\n"
    			+ "THEN 'evening'\n"
    			+ "When incident_hour >20 and  incident_hour <=24\n"
    			+ "THEN 'night'\n"
    			+ "END TIME_INTERVAL\n"
    			+ "FROM \"PARCHA.SRIKANTHR\".incident)\n"
    			+ "---select * from temp;\n"
    			+ "SELECT count(*), year, month, time_interval\n"
    			+ "from (\n"
    			+ "        select incident_id, to_char(INCIDENT_DATE, 'YYYY') as Year, to_char(INCIDENT_DATE, 'MM') as Month, TIME_INTERVAL\n"
    			+ "        from temp where to_char(INCIDENT_DATE, 'YYYY') >=:StartYear and to_char(INCIDENT_DATE, 'YYYY') <=:EndYear )\n"
    			+ "Group By TIME_INTERVAL,Year, Month\n"
    			+ "Order by TIME_INTERVAL, year, month")
    			.setParameter("StartYear",startYear)
    			.setParameter("EndYear", endYear)
    			.list();
    	System.out.println(obj);
    	HashMap <String, List<Object[]>> output=new HashMap <String, List<Object[]>>();
    	
    	for (Object[] objects : obj){ 
    		
    		List < Object[]> records= new ArrayList<Object[]> ();
    		Object[] item=new Object[3];
    		item[0]=objects[0];
			item[1]=objects[1];
			item[2]=objects[2];
			
    		if (output.containsKey(objects[3])){
    			records= output.get(objects[3]);
    			records.add(item);
    		}
    		else {
    			records.add(item);
    			
    			output.put(String.valueOf(objects[3]), records);
    		}
    	}
    	tx1.commit();
    	
    	System.out.println("Successful");
    	return new ResponseEntity<>(output, HttpStatus.OK);
    	
	}
	
}

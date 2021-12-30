package hibernate.HibernateTest;


import java.math.BigDecimal;
import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.cfg.Configuration;
import org.hibernate.type.IntegerType;
import org.hibernate.type.StringType;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;



/**
 * Hello world!
 *
 */
@SpringBootApplication
public class App 
{
    @SuppressWarnings("unchecked")
	public static void main( String[] args )
    {
    	
    	
    	Alien human = new Alien();
//    	human.setAid(118);
//    	human.setAname("PAWdrgrjhgsdsd");
//    	human.setAcolor("White");
//    	
//    	Configuration con = new Configuration().configure().addAnnotatedClass(Alien.class);
    	Configuration con = new Configuration().configure().addAnnotatedClass(Employee.class).addAnnotatedClass(Department.class).addAnnotatedClass(Alien.class);
//    	
    	SessionFactory sf = con.buildSessionFactory();
//    	
    	Session session = sf.openSession();
//    	Display dis = new Display();
//    	dis.setSession(session);
    	SpringApplication.run(App.class,args);
//    	dis.query1();
    	
    	System.out.println("@@@@@@@@@@");
//    	
//    	Transaction tx = session.beginTransaction();
//    	session.save(human);
//    	tx.commit();
    	
//    	Transaction tx1 = session.beginTransaction();
//    	//Mapping Native query to Entity
////        List<Employee> employees = session.createNativeQuery("SELECT * FROM employee",Employee.class)
////              .getResultList();
//    	List<Object[]> employees = session.createNativeQuery("SELECT count(*), year, month\n"
//    			+ "from (\n"
//    			+ "        select incident_id, to_char(INCIDENT_DATE, 'YYYY') as Year, to_char(INCIDENT_DATE, 'MM') as Month\n"
//    			+ "        from \"PARCHA.SRIKANTHR\".incident\n"
//    			+ "        where to_char(INCIDENT_DATE, 'YYYY') >= '2018' and to_char(INCIDENT_DATE, 'YYYY') <= '2019'\n"
//    			+ "        and incident_hour >= 4 and incident_hour <= 8\n"
//    			+ "     )\n"
//    			+ "Group By Year, Month\n"
//    			+ "Order by year, month").list();
//    	System.out.println(employees);
////    	session.save(human);
//    	for (Object[] objects : employees) {
//            BigDecimal id=(BigDecimal) objects[0];
////            Integer count = (Integer) id;
////            String name=(String)objects[1];
//            System.out.println("Count["+id.intValue()+"]");
//         }
//    	
////        for (Employee employee : employees) {
////           Integer id=employee.getId();
////           String name=employee.getName();
////           String designation=employee.getDesignation();
////           System.out.println("Employee["+id+","+name+","+designation+"]");
////        }
//        
//        //Mapping Native JOIN query to Entities
//        System.out.println("--------------------------------------------------------------");
//        List<Object[]> departments=session.createNativeQuery(""
//              + "select e.*, d.* "
//              + "from department d inner join  employee e "
//              + "on d.dpt_id=e.dpt_id")
//              .addEntity("d", Department.class)
//              .addJoin("e", "d.employees")
//              .list();
//        
//        for (Object[] object : departments) {
//           Department department=(Department)object[0];
//           System.out.println("Department - "+department.getName());
//           for (Employee employee : department.getEmployees()) {
//              System.out.println("\t Employee - "+employee.getName()+" \t Designation - "+employee.getDesignation());
//           }
//        }
//    	tx1.commit();
    	
    }
}


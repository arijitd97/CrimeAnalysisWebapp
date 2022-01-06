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


@SpringBootApplication
public class App 
{
    @SuppressWarnings("unchecked")
	public static void main( String[] args )
    {
    	
    	
    	Configuration con = new Configuration().configure();
    	SessionFactory sf = con.buildSessionFactory();
//    	
    	Session session = sf.openSession();
    	SpringApplication.run(App.class,args);
    	
    	System.out.println("Application running!!");
    	
    }
}


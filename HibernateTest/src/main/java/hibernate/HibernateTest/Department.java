package hibernate.HibernateTest;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
@Entity
//@Table(name="DEPARTMENT")
public class Department {
   @Id
//   @Column(name = "DPT_ID")
   private int dpt_id;

//   @Column(name = "NAME")
   private String name;

   @OneToMany(cascade = CascadeType.ALL, mappedBy = "dpt_id")
   private List<Employee> employees = new ArrayList<Employee>();

public int getDpt_id() {
	return dpt_id;
}

public void setDpt_id(int dpt_id) {
	this.dpt_id = dpt_id;
}

public String getName() {
	return name;
}

public void setName(String name) {
	this.name = name;
}

public List<Employee> getEmployees() {
	return employees;
}

public void setEmployees(List<Employee> employees) {
	this.employees = employees;
}
   
   
   // Getter and Setter methods


   
}

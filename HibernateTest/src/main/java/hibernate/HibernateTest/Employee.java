package hibernate.HibernateTest;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
//@Table(name = "EMPLOYEE")
public class Employee {

   @Id
//   @Column(name = "EMP_ID")
   private int emp_id;

//   @Column(name = "NAME")
   private String name;

//   @Column(name = "DESIGNATION")
   private String designation;

   @ManyToOne
   @JoinColumn(name = "dpt_id")
   private Department dpt_id;

public int getEmp_id() {
	return emp_id;
}

public void setEmp_id(int emp_id) {
	this.emp_id = emp_id;
}

public String getName() {
	return name;
}

public void setName(String name) {
	this.name = name;
}

public String getDesignation() {
	return designation;
}

public void setDesignation(String designation) {
	this.designation = designation;
}

public Department getDpt_id() {
	return dpt_id;
}

public void setDpt_id(Department dpt_id) {
	this.dpt_id = dpt_id;
}

   


   
}

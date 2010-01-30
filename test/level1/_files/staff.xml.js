var sys = require("sys");
exports.staff = function() {
  
  var doc = new Document("staff");
  
  var implementation = new DOMImplementation({
    "XML" : "1.0"
  });
  
  var notations = new NotationNodeMap(doc);
  notations.setNamedItem(new Notation(doc, "notation1","notation1File", null));
  notations.setNamedItem(new Notation(doc, "notation2",null, "notation2File"));
  
  var entities = new NamedNodeMap();

  entities.setNamedItem(doc.createEntityNode("ent1", doc.createTextNode("es")));
  entities.setNamedItem(doc.createEntityNode("ent2",doc.createTextNode("1900 Dallas Road")));
  entities.setNamedItem(doc.createEntityNode("ent3",doc.createTextNode("Texas")));

//<entElement domestic='Yes'>Element data</entElement><?PItarget PIdata?>  
  var entElement = doc.createElement("entElement");
  entElement.setAttribute("domestic", "Yes");
  entElement.appendChild(doc.createTextNode("Element data"));
  var procElement = doc.createProcessingInstruction("PItarget", "PfIdata");
  entities.setNamedItem(doc.createEntityNode("ent4",entElement, procElement));
  
  
  entities.setNamedItem(doc.createEntityNode("ent5", doc.createTextNode("entityURI")));
  
  
  doc.doctype = new DocumentType("staff", entities, notations);;
  doc.implementation = implementation;  
  
  var staff     = doc.createElement("staff");
  var employees = [];
  var addresses = [];
  var names     = [];
  var positions = [];
  var genders   = [];
  var ids       = [];
  var salaries  = [];
  
  // create 5 employees
  for (var i=0; i<5; i++)
  {
    var employee = doc.createElement("employee");
    var address  = doc.createElement("address");
    var name     = doc.createElement("name");
    var position = doc.createElement("position");
    var gender   = doc.createElement("gender");
    var id       = doc.createElement("employeeId");
    var salary   = doc.createElement("salary");
    
    employee.appendChild(id);
    employee.appendChild(name);
    employee.appendChild(position);
    employee.appendChild(salary);
    employee.appendChild(gender);
    employee.appendChild(address);
    staff.appendChild(employee);

    names.push(name);
    employees.push(employee);
    addresses.push(address);	
    genders.push(gender);
    positions.push(position);
    ids.push(id);
    salaries.push(salary);
  }

  ids[0].appendChild(doc.createTextNode("EMP0001"));
  salaries[0].appendChild(doc.createTextNode("56,000"));
  addresses[0].setAttribute("domestic", "Yes");
  addresses[0].appendChild(doc.createTextNode('1230 North Ave. Dallas, Texas 98551'));
  names[0].appendChild(doc.createTextNode("Margaret Martin"));
  genders[0].appendChild(doc.createTextNode("Female"));
  positions[0].appendChild(doc.createTextNode("Accountant"));


  ids[1].appendChild(doc.createTextNode("EMP0002"));
  salaries[1].appendChild(doc.createTextNode("35,000"));
  
  addresses[1].setAttribute("domestic", "Yes");
  addresses[1].setAttribute("street", "Yes");
  addresses[1].appendChild(doc.createEntityReference("ent2"));
  addresses[1].appendChild(doc.createTextNode(" Dallas, "));
  addresses[1].appendChild(doc.createEntityReference("ent3"));
  addresses[1].appendChild(doc.createTextNode("\n 98554"));
  
  names[1].appendChild(doc.createTextNode("Martha Raynolds"));
  names[1].appendChild(doc.createCDATASection("This is a CDATASection with EntityReference number 2 &ent2;"));
  names[1].appendChild(doc.createCDATASection("This is an adjacent CDATASection with a reference to a tab &tab;"));  
  genders[1].appendChild(doc.createTextNode("Female"));
  positions[1].appendChild(doc.createTextNode("Secretary"));


  ids[2].appendChild(doc.createTextNode("EMP0003"));
  salaries[2].appendChild(doc.createTextNode("100,000"));
  addresses[2].setAttribute("domestic", "Yes");
  addresses[2].setAttribute("street", "No");
  addresses[2].appendChild(doc.createTextNode("PO Box 27 Irving, texas 98553"));
  names[2].appendChild(doc.createTextNode("Roger\n Jones")) ;
  genders[2].appendChild(doc.createEntityReference("ent4"));//Text("&ent4"));
  positions[2].appendChild(doc.createTextNode("Department Manager"));

  
  ids[3].appendChild(doc.createTextNode("EMP0004"));
  salaries[3].appendChild(doc.createTextNode("95,000"));
  addresses[3].setAttribute("domestic", "Yes");
  addresses[3].setAttribute("street", "Y");
  addresses[3].appendChild(doc.createEntityReference("ent1"));
  addresses[3].appendChild(doc.createTextNode("27 South Road. Dallas, Texas 98556"));
  names[3].appendChild(doc.createTextNode("Jeny Oconnor"));
  genders[3].appendChild(doc.createTextNode("Female"));
  positions[3].appendChild(doc.createTextNode("Personal Director"));
  

  ids[4].appendChild(doc.createTextNode("EMP0005"));
  salaries[4].appendChild(doc.createTextNode("90,000"));  
  addresses[4].setAttribute("street", "Yes");
  addresses[4].appendChild(doc.createTextNode("1821 Nordic. Road, Irving Texas 98558"));
  names[4].appendChild(doc.createTextNode("Robert Myers"));
  genders[4].appendChild(doc.createTextNode("male"));
  positions[4].appendChild(doc.createTextNode("Computer Specialist"));
  
  doc.appendChild(doc.createProcessingInstruction("TEST-STYLE", "PIDATA"));

  /*<?xml version="1.0"?>
  <?TEST-STYLE PIDATA?>
  <!DOCTYPE staff SYSTEM "staff.dtd" [
  <!ENTITY ent1 "es">
  <!ENTITY ent2 "1900 Dallas Road">
  <!ENTITY ent3 "Texas">
  <!ENTITY ent4 "<entElement domestic='Yes'>Element data</entElement><?PItarget PIdata?>">
  <!ENTITY ent5 PUBLIC "entityURI" "entityFile" NDATA notation1>
  <!ENTITY ent1 "This entity should be discarded">
  <!NOTATION notation1 PUBLIC "notation1File">
  <!NOTATION notation2 SYSTEM "notation2File">
  ]>

  <!-- This is comment number 1.-->
  <staff>
  <employee>
  <employeeId>EMP0001</employeeId>
  <name>Margaret Martin</name>
  <position>Accountant</position>           
  <salary>56,000</salary>
  <gender>Female</gender>
  <address domestic="Yes">1230 North Ave. Dallas, Texas 98551</address>
  </employee>

  <employee>
  <employeeId>EMP0002</employeeId>
  <name>Martha Raynolds<![CDATA[This is a CDATASection with EntityReference number 2 &ent2;]]>
  <![CDATA[This is an adjacent CDATASection with a reference to a tab &tab;]]></name>
  <position>Secretary</position>
  <salary>35,000</salary>
  <gender>Female</gender>
  <address domestic="Yes" street="Yes">&ent2; Dallas, &ent3;
  98554</address>
  </employee>
  
  <employee>
  <employeeId>EMP0003</employeeId>
  <name>Roger
  Jones</name>
  <position>Department Manager</position>
  <salary>100,000</salary>
  <gender>&ent4;</gender>
  <address domestic="Yes" street="No">PO Box 27 Irving, texas 98553</address>
  </employee>
  
  <employee>
  <employeeId>EMP0004</employeeId>
  <name>Jeny Oconnor</name>
  <position>Personnel Director</position>
  <salary>95,000</salary>
  <gender>Female</gender>

  <address domestic="Yes" street="Y&ent1;">27 South Road. Dallas, Texas 98556</address>
  </employee>
  <employee>
  <employeeId>EMP0005</employeeId>
  <name>Robert Myers</name>
  <position>Computer Specialist</position>
  <salary>90,000</salary>

  <gender>male</gender>
  <address street="Yes">1821 Nordic. Road, Irving Texas 98558</address>
  </employee>
  </staff>*/

  doc.appendChild(doc.createComment(" This is comment number 1."));
  doc.appendChild(staff);
  
  return doc;
};
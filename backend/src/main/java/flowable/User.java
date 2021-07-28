package flowable;

public class User {

    public User(String name){
        this.name = name;
    }

    private String name;

    private int age = 18;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }
}

# foodie
 SKC group project creating recipe-sharing app

U3 Lab 1: Design and Create JavaScript Objects from Models

You will be creating as many objects from models for your project as you think you will need. 

Meet with your group to discuss your designs and break them down. 

Your design should consider data types, properties, and methods for each of the objects you need. Consider the organization and how the data might interact. (Put the answers to these questions in a READ_ME.txt file in your repository).  

- What are the major entities for your objects? Who needs to access them?
    Blog Post (accessed by user)
    Recipe (accessed by user)
    User (accessed by mod)

- What assumptions are you making about your entities? Clarify them. 
    - Assumptions about what ingredients a user already has
    - Assume user knows how to use kitchen equipment
    - Don't assume user or non-user
    - Only user can create/add recipe or blogpost

- What functionality should each entity have?
    Blog Post methods: 
        - Create/Add (user, mod)
        - Remove (user, mod)
        - Edit  (user, mod)
        - Share (user)
        - Comment (user)
        - Upvote/Downvote (user)
    
    Recipe methods:
        - Create/Add (user, mod)
        - Remove (user, mod)
        - Edit  (user, mod)
        - Share (user)
        - Comment (user)
        - Rate (user)

    User methods:
        - Create (non-user)
        - Delete (user)
        - Login (non-user)
        - Logout (user)

- How do the entities need to be connected? 
    - Recipe connected to profile (show created recipes on profile)
    - Recipe connected to blog post (blog post created on recipe creation, blog post might be sharing old recipe)
    - Recipe and blog post connected to user (tracks which user created)
    - Profile connected to user (user has attached profile object storing more profile info)

- Can you identify where you use Abstraction, Polymorphism, Inheritance, and Encapsulation in your designs?
    A:  - Search feature: only show relevant data

    P:  - Create/Edit/Remove blogpost/recipe, different constructors depending on which object type passed in

    I:  - Nowhere yet

    E:  - 

- How will you apply KISS and DRY to your design?
    - Utilize polymorphism to Create/Edit/Remove blogpost/recipe with same method using different parameters

- Break up the work within the team and implement the objects and methods from your designs.

- The code should be well documented with comments, have good code structure, and following naming conventions. 

- Push your code to your repository. 

- Submit your last commit hash for the lab to this assignment.
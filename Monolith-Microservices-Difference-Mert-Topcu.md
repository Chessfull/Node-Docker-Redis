I will try to examine monolith and microservices differences with two header starting from basic defination and pros & cons following.

# Defination

Monolith -> Everything is tightly packed together so it has a single 'build' system that builds the entire application.

Microservices -> Make packed as tightly I define above at monolith, this time make package into smaller like instead of having one app, you have smaller services, each doing a specific works.

# Pros & Cons

Monolith

-> **Faster Development**, especially I mean for small apps.

-> **Easier to Test**, I mean you don’t have to worry about how different services communicate etc.

-> **Harder to Maintain**, like when your app grown coming harder to maintain. 

-> **Longer development scale**, I mean you might to update the entire app and retest everything cause of sticked eachother.

________________________________________________________________________________________________________________________

Microservices

-> **Flexibility**, Each service is independent. 

-> **Better for large teams and projects, actually almost must**, allowing each team to focus on specific functionality.

-> **Increased Complexity**, of course with more service and communication.

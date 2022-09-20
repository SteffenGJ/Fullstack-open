describe("Bloglist", function () {
    beforeEach(function () {
        cy.request("POST", "http://localhost:3003/api/testing/reset");
        const user = {
            name: "Oswald Jensen",
            username: "Oller",
            password: "1234",
        };
        cy.request("POST", "http://localhost:3003/api/users", user);
        cy.visit("http://localhost:3000");
    });

    it("exists", function () {
        cy.contains("Blogs");
    });

    describe("login", function () {
        it("can log in succesfully", function () {
            cy.get("#username").type("Oller");
            cy.get("#password").type("1234");
            cy.get("#submit-button").click();
            cy.contains("Hello");
        });
        it("fails to login when password is false", function () {
            cy.get("#username").type("Oller");
            cy.get("#password").type("12345");
            cy.get("#submit-button").click();
            cy.contains("Wrong");
        });
    });

    describe("when logged in", function () {
        beforeEach(function () {
            cy.login({ username: "Oller", password: "1234" });
        });

        it("a user can create new blogs", function () {
            cy.createBlog({
                title: "Blog1",
                author: "Harry",
                url: "www.url.dk",
            });
            cy.contains("Blog1");
        });

        it("a user can like a blog", function () {
            cy.createBlog({
                title: "Blog1",
                author: "Harry",
                url: "www.url.dk",
            });
            cy.contains("Blog1");
            cy.contains("show").click();
            cy.get(".like-button").click();
            cy.contains("likes: 1");
        });

        it("a user can delete a blog", function () {
            cy.createBlog({
                title: "Blog1",
                author: "Harry",
                url: "www.url.dk",
            });
            cy.contains("Blog1");
            cy.contains("show").click();
            cy.get(".delete-button").click();
            cy.visit("http://localhost:3000");
            cy.get("html").should("not.contain", "Blog1");
        });

        it("the blogs are sorted by number of likes", function () {
            cy.createBlog({
                title: "Blog1",
                author: "Harry",
                url: "www.url.dk",
                likes: 24,
            });
            cy.createBlog({
                title: "Blog2",
                author: "Potter",
                url: "www.url.dk",
                likes: 27,
            });
            cy.visit("http://localhost:3000");
            cy.get(".blog-holder").eq(0).should("contain", "Blog2");
        });
    });
});

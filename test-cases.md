### Unauthenticated User

- When I go to the root url, then I should be directed to the project list page.
- When I click on a project, then I should be taken to that project's info page.
- When I click the "Login" button in the account dropdown, then I should see a modal on the current page I'm on.
- Given I have an account, when I log into my account then I should see a success notification and be authenticated.
- When I choose to register a new account, then I should see the registration form.
- Given that I have registered successfully, when I register then I should see a notification that I've been sent a verification email.
- When I click on the link in the email, then I should be taken to the application's project list page and see a notification that I can now login.
- When I click on the account dropdown, then I should be able to login.

### Student

##### Unregistered

- Given that a project's registration window is open, when I click on a project, then I should be able to see the registration tiers and when I click on it I should be directed to stripe.
- Given that I've successfully registered through stripe, when I come back to the application, then I should see a success notification and be able to see the extra buckets.
- Given that a project's registration window is closed, then I should not be able to register.
- Given that a project's registration tier is sold out, then I hsould not be able to register.
- When I register for a class, when I navigate to another project, then I should see my registered class in the project toggle dropdown.

##### Registered

- When I click on the account dropdown, then I should see an option to logout.
- When I logout, then I should be directed to the project list screen.
- Given that I have registered for classes, when I'm viewing another project then I should see my project in the "project toggle" dropdown.
- When I click on the project in the project toggle, then I should navigate to that project's info page.
- Given that I have access to a homework bucket, when I load the bucket then I should see a list of stacks with the most recent on top.
- When I click on the Plus icon in the bottom right of the bucket, then I should see my file browser to upload files.
- Given that I have chosen images to upload, when that processes, then I should see the progress bar fill up.
- Given that I hvae chosen a pdf file to upload, when that processes, then I should see a new pdf upload section.
- Given that I hvae chosen a video file to upload, when that processes, then I should see a new video upload section.
- When the upload is complete, then I should see the stack that I've uploaded in the upper left corner of the homework bucket.
- When I click on an image stack, then I should see the images that were uploaded in their alphanumeric ordering and I should be able to navigate by pressing the arrows or with my keyboard arrows.
- Given that I have an image stack open, when I press ESC or click out of the modal it should close.
- When I click on the class links bucket, then I should be directed there and see proper loading of the messages.

### Teacher

##### General

- Given that I'm a teacher or owner of a class project, when I view the class page then I should see an Edit Class button AND when I click on it I should be taken to the manage class project page.

##### Manage Class Info

- Given I'm on manage class info, when I modify the project data and press save, then the project data should be updated when I go back to the project page.
- Given I'm on manage class info, when I add a teacher by email, then they should be added and have proper access.
- Given the class has a teacher, when I remove a teacher, then they should be removed from having their teacher access AND should no longer show as a teacher on the project page.
- Given I'm on manage class info, when I enter an invalid email in the teacher section, then I should see a toast letting me know that it was invalid.
- Given I'm on manage class info, when I enter an invalid email in the teacher section, then I should see a toast letting me know that it was invalid.
- Given I'm on manage class info, when I choose to upload a new class image, then I should see my file browser open up to choose which file to upload.
- Given I have uploaded images, when I choose to remove a class image, then that image should be removed and I should see a toast verifying the image was removed.

##### Manage Tiers

- Given I'm on the manage tiers section, when I click the "Add tier" button, then I should see a modal come up with a form for me to create a new tier.
- Given that I'm on the form to create a tier, when I fill out the data correctly and press save, then I should see confirmation it was created AND I should see it on the page AND the modal should be closed.
- Given that I have registration tier, when I click on the pencil icon, then I should see a form to edit the registration tier AND the data should be pre-populated.
- Given that I'm on the form to update a tier, when I fill out the data correctly and press save, then I should see confirmation it was created AND I should see it on the page AND the modal should be closed.
- Given that I'm updating a registration tier AND it has no enrollments, when I click on the "Delete" button, then I should see a confirmation to delete the tier.
- Given that I'm updating a registration tier AND it has enrollments, when I try to click on the "Delete" button, then nothing should happen AND I should see a tooltip letting me know the tier has enrollments.
- Given that I'm on the confirm delete registration tier modal, when I click cancel, then I should be taken back to update the tier.
- Given that I'm on the confirm delete registration tier modal, when I click to confirm deletion, then the tier should be deleted AND it should be removed from the screen AND the modal should close with a confirmation of deletion.
- Given my project has buckets, when I click on the "Add/Remove Buckets" button, then I should see a list of all my buckets AND the ones that are currently in the tier should be highlighted.
- Given I'm adding/removing buckets, when I click on a bucket, then it should toggle its highligh AND it should be added/removed from the tier accordingly.
- Given I'm adding/removing buckets, when I click "confirm", then the tier container should go back to show me the original view of which buckets are currently in the tier.
- Given that I'm adding/removing buckets, when I click the trash can, then I should see a modal to confirm deletion of the bucket.
- Given that I'm on the confirm delete bucket modal, when I click Delete, then the bucket should be removed from everywhere AND I should see confirmation of the deletion.
- Given I'm adding/removing buckets, when I click "Create new bucket", then I should see a modal with a form to create a new bucket.
- Given that I'm creating a new bucket, when I fill it out and successfully create, then it should be added into the tier or public that I chose to create a new bucket from.
- Given I'm viewing the initial view, when I click on the bucket slot, then I should see a form to edit the bucket.
- Given I'm editing the bucket, when I fill out the form and save, then the bucket data should be updated AND I should see a confirmation while the modal closes.
- Given I'm viewing the initial view, when I click the x of a bucket slot, then that bucket should be removed from the tier.
- Given that a bucket is in a tier, when I add that bucket to the public view, then it should be added to the public view AND it should be removed from any tier that it was in before being made public.

##### Manage Students

- Given that I have enrollments in my project, when I go to the manage students tab, then I should see a table with all of the enrollments.
- Given that there are enrollments, when I click on the actions button in an enrollment row, then I should see the actions available for that enrollment.
- Given that an enrollment has not been refunded, when I click the refund action button, then I should see a loading spinner AND a confirmation when the refund has been completed.
- Given that an enrollment has been refunded, when I click the actions button, then the "Refund" action should be disabled.
- When I click on the update action button, then I should see a modal to update the enrollment record AND the data should be populated.
- Given I'm updating an enrollment record, when I save, then it should update the data shown on the screen AND I should see a confirmation while the modal is closing.
- Given that I have no filters chosen, when I am viewing the student enrollments section, then I should see all the enrollment records.
- Given that I have chosen filters, when I am viewing the student enrollments section, then I should see only the enrollments that fit my criteria.

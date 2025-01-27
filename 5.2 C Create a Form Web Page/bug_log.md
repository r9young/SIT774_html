# 16/08/2024


## validation

Correct code

```html


<div class="col-md-3">
    <label for="validationServer04" class="form-label">State</label>

    <select class="form-select is-invalid" id="validationServer04" aria-describedby="validationServer04Feedback" required>

    <option selected disabled value="">Choose...</option>

    <option>...</option>
    
    </select>
    <div id="validationServer04Feedback" class="invalid-feedback">
    Please select a valid state.
    </div>
</div>

```


bug code


```html

<div class="row mb-5">
    <label class="col-sm-2" for="validationServer03" class="form-label">City</label>
    <div class="col-sm-10">
        <input type="text" class="form-control is-invalid" id="validationServer03" aria-describedby="validationServer03Feedback" required>
    </div>
    <div id="validationServer03Feedback" class="invalid-feedback">
        Please provide a valid city.
    </div>
    </div>
</div>

```

fixed bug

```html

<form class="row g-3 needs-validation" novalidate>
    <div class="col-md-6 position-relative">
        <label for="validationTooltip07" class="form-label">Last name</label>
        <input type="text" class="form-control" id="validationTooltip07" required>
        <div class="invalid-tooltip">
            Please provide a last name.
        </div>
    </div> 
</form>

<script>
          // Example starter JavaScript for disabling form submissions if there are invalid fields
          (function () {
            'use strict'

            // Fetch all the forms we want to apply custom Bootstrap validation styles to
            var forms = document.querySelectorAll('.needs-validation')

            // Loop over them and prevent submission
            Array.prototype.slice.call(forms)
              .forEach(function (form) {
                form.addEventListener('submit', function (event) {
                  if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                  }

                  form.classList.add('was-validated')
                }, false)
              })
          })() 
</script>

```
----

## Form Layout Issue (Finalized)


**issue**

the problem of the following code is that even I have set the col-sm-2 and col-sm-10 in label and input respectively.
Both of item are still in a separeate row. 



```html
  <div class="row position-relative">
        <label class="col-sm-2" for="validationTooltip03" >Firstname*:</label>
        <input type="text" class="col-sm-10 form-control" id="validationTooltip03" required>
        <div class="invalid-tooltip">
        Please provide a valid city.
        </div>
    </div>

```

**Solution**

Short summary:  (`col-sm-2`, `col-sm-10`) should be applied to 'div' rather than `label` and `input` elements.



The issue you're facing is due to the way Bootstrap's grid system works. Specifically, you are trying to use the Bootstrap grid classes (`col-sm-2`, `col-sm-10`) on an `input` element directly, which isn't recommended. The grid classes should be applied to `div` elements that wrap your `label` and `input` elements. This ensures proper alignment.

Here's the corrected code:

```html
<div class="row position-relative">
    <div class="col-sm-2">
        <label for="validationTooltip03">Firstname*:</label>
    </div>
    <div class="col-sm-10">
        <input type="text" class="form-control" id="validationTooltip03" required>
        <div class="invalid-tooltip">
            Please provide a valid city.
        </div>
    </div>
</div>
```

#### Explanation:
- **Grid Classes on Wrappers**: The grid classes (`col-sm-2`, `col-sm-10`) are applied to `div` elements that contain the `label` and `input` respectively. This ensures that the `label` and `input` are correctly aligned in a row.
- **Correct Alignment**: By wrapping the `label` and `input` inside `div` elements with the appropriate grid classes, they will align correctly on larger screens.

#### Additional Notes:
- **`position-relative` on `row`**: This class is correct if you're planning to use `position` utilities within the row or if the tooltip requires relative positioning.
- **Invalid Tooltip Positioning**: Ensure that the `invalid-tooltip` is positioned appropriately relative to the input field. If you face any issues with the tooltip placement, additional CSS might be needed to adjust its position.

This adjustment should solve the alignment issue on larger screens.


-----

## Email-validation (Finalized)


### how to make sure that we input a valid email address


```html


<div class="row position-relative m-3">
  <label class="col-sm-2" for="validationTooltip03" >Email:</label>
  <div class="col-sm-10">
    <div class="input-group">
      <span class="input-group-text" id="inputGroupPrepend2">@</span>
      <input type="email" class="form-control" id="validationTooltip03" placeholder="name@example.com" required>
    </div>
  </div>
</div>
```

### Explanation:
type="email": This ensures the input is checked against a valid email format.

-------

## Layout issue: the checkboxes are displayed in a row on larger screens, but hould be arranged in a vertical list in a small screen.


**Issue**

The issue I need to address is ensuring that the checkboxes are displayed in a row on larger screens, but on smaller screens, they should be arranged in a vertical list.

```html

 <div class="row position-relative m-3">
    <label class="col-sm-2" for="validationTooltip03" >Mobile:</label>
    <!-- <div class="d-flex flex-row"> -->
    <div class="col-sm-10 ">
        <div class="form-check">
            <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1">
            <label class="form-check-label" for="flexRadioDefault1">
            No caps yet
            </label>
        </div>
        <div class="form-check">
            <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked>
            <label class="form-check-label" for="flexRadioDefault2">
            Between 1 and 10 caps
            </label>
        </div>
        <div class="form-check">
            <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked>
            <label class="form-check-label" for="flexRadioDefault2">
            Between 11 and 29 caps
            </label>
        </div>
    </div>
</div>

```


**Solution**


```html


<div class="container text-center">
  <div class="row">
    <div class="col-6 col-sm-3">.col-6 .col-sm-3</div>
    <div class="col-6 col-sm-3">.col-6 .col-sm-3</div>
  </div>
</div>


```

----------

## Why does the toggle switch occupy the entire row in the following code, while the two buttons are displayed on the same row? (Finalized)


```html

<div class="row position-relative fs-10">
    <label class="col-sm-2" for="validationTooltip03"></label>
    <div class="container col-sm-10">
        <div class="form-check form-switch">
        <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" checked>
        <label class="form-check-label" for="flexSwitchCheckChecked">Yes, Please also send me discount!</label>
        </div>
        <div>
        <button type="button" class="btn btn-primary">Sign Up</button>
        <button type="button" class="btn btn-secondary">Reset</button>
        </div>
    </div>  
</div>
```


**Answer:**

The reason the toggle switch occupies the whole line while the two buttons are on the same line is due to the way Bootstrap handles the layout and display properties of the elements.

### Explanation:
1. **Toggle Switch (`form-check form-switch`):**
   - The `form-check` class applies some default styling, which often includes `display: block;` to its child elements (like the input and label), making them occupy the full width of the parent container. 
   - This behavior causes the toggle switch (input element) to occupy the whole line, and the label appears on the next line.

2. **Buttons (`btn btn-primary`, `btn btn-secondary`):**
   - By default, Bootstrap buttons (`btn`) are inline-block elements. This allows them to be displayed next to each other on the same line as long as there is enough horizontal space in the parent container.



-----

## Pagination (Finalized)

**What is Pagination?**

Pagination include: sizing, alignment, css ...


### size of a picture in a card

**issue**

The issue is the folllwing code does not resize the photo and put it in a object-fit:cover!!


```html

<div class="card col-sm-3 m-2" style="width: 18rem;">
    <img src="../img/image_6.png" class="card-img-top" alt="..." size="width:200px height:200px object-fit:cover;">
    <div class="card-body">
        <h5 class="card-title">Card title</h5>
        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        <a href="#" class="btn btn-primary">Go somewhere</a>
    </div>
</div>
```


**Solution**

```html

 <div class="card col-sm-3 m-2 p-0 h-100" style="width: 18rem;">
    <img src="../img/image_1.png" class="card-img-top img-fluid" alt="..." style="height:200px;object-fit: cover;"> 
    <div class="card-body">
        <h5 class="card-title">Card title test</h5>
        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        <a href="#" class="btn btn-primary">Go somewhere</a>
    </div>
</div>

```

we add:

p-0
h-100
image-fluid
style="height:200px;object-fit: cover


----



## Mobile Number (Finalized)


**Issue** 
 
What value should I give in type?

```html

<div class="row position-relative m-2">
  <label class="col-sm-2" for="validationTooltip03" >Mobile:</label>
  <div class="col-sm-10 ">
    <input type="tel" class="form-control" id="validationTooltip03" placeholder="04xxxxxxxx" required>
  </div>
  <div class="invalid-tooltip">
    Please provide a valid mobile number.
  </div>
</div>

```

**Answer**

tel 

type="tel"

and add a patter - pattern="04\d{8}"

```html

         <input type="tel" class="form-control" id="validationTooltip03" placeholder="04xxxxxxxx" pattern="04\d{8}" required>
```


-----

## radio

**Issue**
I have two radio box, but I only can choose either of them.

**Solution**

Explanation:
  Radio buttons: Use type="radio" when you want the user to select only one option from a group.
  Checkboxes: Use type="checkbox" when you want to allow the user to select multiple options from a group.
  By making these changes, you'll ensure that users can only select one option from the first group (radio buttons) and can select multiple options from the second group (checkboxes).


Key Changes:
  **Unique name attributes**: Each group of radio buttons (capsOwned and capWearingPlace) now has a unique name attribute. This allows independent selection within each group.
  Unique id attributes: Each id is unique to avoid conflicts and ensure proper labeling.
  With these changes, you should be able to select one option from each group without issues.


-----


## Invalid message


**Issue**

the issue is the invalid warning message appear on the bottom of last radio. 
It needs to apper on the buttom of the choice. 

```html

 <!-- checkbox_1 -->
<div class="row position-relative m-2 needs-validation" novalidate>
  <label class="col-sm-2" for="validationTooltip03">Number of caps owned:</label>

  <div class="container col-sm-10">
    <div class="row">
      <div class="col-6 col-sm-2 form-check">
        <input class="form-check-input" type="radio" name="aflexRadioDefault" id="aflexRadioDefault1" required>
        <label class="form-check-label" for="aflexRadioDefault1">
          No caps yet
        </label>
      </div>

      <div class="col-6 col-sm-2 form-check">
        <input class="form-check-input" type="radio" name="aflexRadioDefault" id="aflexRadioDefault2" required>
        <label class="form-check-label" for="aflexRadioDefault2">
          Between 1 and 10 caps
        </label>
      </div>
      <div class="col-6 col-sm-2 form-check">
        <input class="form-check-input" type="radio" name="aflexRadioDefault" id="aflexRadioDefault3" required>
        <label class="form-check-label" for="aflexRadioDefault3">
          Between 11 and 29 caps
        </label>
        <div class="invalid-feedback">More more example invalid feedback text</div>
      </div>
    </div>
  </div>
</div>

```


**correct code**

<div class="row position-relative m-2">
    <label class="col-sm-2" for="validationFN">Firstname*:</label>
    <div class="col-sm-10">
      <input type="text" class="form-control" id="validationFN" required>
      <div class="invalid-feedback">
        Please provide a valid First Name.
      </div>
    </div>
</div>

----

## Why the invalid message does not appear? (Not Finalized)

**issue**

Why the following message does not appear?


```html

  <div class="row position-relative m-2">
    <div class="row">
      <label class="col-sm-2" for="validationTextarea1" class="form-label">Write a poem about your cap:</label>
      <textarea class="col-sm-10 form-control is-invalid" id="validationTextarea1" placeholder="Write a poem about your cap:" required></textarea>
    </div>
    <div class="invalid-feedback">Please enter a message in the textarea.</div>
</div>


```


-----

## Move the picture a little bit lower?

```html


 <img src="../img/image_2.png" class="card-img-top img-fluid" alt="..." style="height:200px;object-fit: cover; object-position: 0 60px;"> 


```

**solution**

**Summary** object-position: 0 20px;

To adjust the content of the image so that the visible portion is positioned lower (rather than moving the entire image element), you can manipulate the `object-position` property. This property allows you to control which part of the image is displayed when the image is resized or cropped.

Here's how you can do it:

```html
<img src="../img/image_2.png" class="card-img-top img-fluid" alt="..." style="height:200px; object-fit: cover; object-position: 0 20px;">
```

In this example:

- `object-fit: cover;` ensures that the image covers the entire height and width of the container while maintaining its aspect ratio.
- `object-position: 0 20px;` shifts the image content down by 20 pixels within its container. The first value (`0`) represents the horizontal position, and the second value (`20px`) represents the vertical position.

You can adjust the `20px` value to move the image content lower or higher within the container, depending on how much of the lower part of the image you want to show.


---


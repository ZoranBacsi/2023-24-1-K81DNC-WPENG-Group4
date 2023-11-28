<?php
    $regdate = $_POST['regdate'] ?? date('Y-m-d');
    $fullname = $_POST['fullname'] ?? '';
    $email = $_POST['email'] ?? '';
    $id = $_POST['id'] ?? '';
    $age = $_POST['age'] ?? '';
    $gender = $_POST['gender'] ?? '';
    $accept = $_POST['accept'] ?? false;
    $accept = filter_var($accept, FILTER_VALIDATE_BOOLEAN);
    $notes = $_POST['notes'] ?? '';

    $errors = [];
    if($fullname === '')
        $errors['fullname'] = 'Name field is required!';
    else if(count(explode(' ', $fullname)) < 2)
        $errors['fullname'] = 'The name should contain at least two words!';
?>

<!DOCTYPE html>
<html lang="hu">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registration</title>
</head>
    <ul>
        <?php foreach ($errors as $e): ?>
            <li>
                <?= $e ?>
            </li>
        <?php endforeach ?>
    </ul>
    <form action="reg.php" method="post">
        Full name: <input type="text" name="fullname" value="<?= $fullname ?>"> <br>
        E-mail: <input type="text" name="email" value=""> <br>
        Healthcare ID: <input type="text" name="id" value=""> <br>
        Age: <input type="text" name="age" value="">  <br>
        Gender:
            <input type="radio" name="gender" value="m">Male
            <input type="radio" name="gender" value="f">Female
        <input type="checkbox" name="accept" <?= $accept ? 'checked' : '' ?>> Accept EULA: <?= $errors['accept'] ?? '' ?> <br>
        Registration date: <input type="date" name="regdate" value="mai dátum"><br>
        Note: <br><textarea name="notes"></textarea><br>
        <button type="submit">Registration</button>
    </form>
    <a href="index.php">Back to Home</a>
</body>
</html>
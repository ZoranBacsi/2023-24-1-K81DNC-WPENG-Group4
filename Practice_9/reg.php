<?php
    
?>

<!DOCTYPE html>
<html lang="hu">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Regisztráció</title>
</head>
    <form action="reg.php" method="post">
        Teljes név: <input type="text" name="fullname" value=""> <br>
        E-mail: <input type="text" name="email" value=""> <br>
        TAJ szám: <input type="text" name="taj" value=""> <br>
        Életkor: <input type="text" name="age" value="">  <br>
        Nem:
            <input type="radio" name="gender" value="m">Férfi
            <input type="radio" name="gender" value="f">Nő
        <input type="checkbox" name="accept" <?= $accept ? 'checked' : '' ?>> Elfogadom a feltételeket. <?= $errors['accept'] ?? '' ?> <br>
        Regisztráció dátuma: <input type="date" name="regdate" value="mai dátum"><br>
        Megjegyzés: <br><textarea name="notes"></textarea><br>
        <button type="submit">Regisztráció</button>
    </form>
    <a href="index.php">Vissza a kezdőlapra</a>
</body>
</html>
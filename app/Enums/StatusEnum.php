<?php

namespace App\Enums;

enum StatusEnum: string
{
    case PUBLISHED = "published";
    case DRAFT = "draft";

    case ACTIVE = "active";
    case INACTIVE = "inactive";
}

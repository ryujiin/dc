# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('catalogo', '0003_loved_producto'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='loved',
            name='productos',
        ),
    ]

# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('cesta', '0002_carro_pedido'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='carro',
            name='pedido',
        ),
    ]
